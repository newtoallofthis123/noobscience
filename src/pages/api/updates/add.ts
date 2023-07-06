import { connectToDatabase, Database } from '../../../utils/db';
import type { APIRoute } from 'astro';
import { hypens, dateUTC } from '../../../utils/utils';

export const post: APIRoute = async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name');
    const content = data.get('content');
    const author = data.get('author');
    const hash = hypens(name);
    const date = dateUTC();
    const { db }: { db: Database } = await connectToDatabase();
    const update_data = await db.collection('page').insertOne({
        name: name,
        content: content,
        author: author,
        hash: hash,
        date: date,
    });
    const result = {
        update_data,
        hash
    };
    return new Response(JSON.stringify(result), {
        headers: { 'content-type': 'application/json' },
    });
};
