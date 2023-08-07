import { connectToDatabase, Database } from '../../../utils/db';
import type { APIRoute } from 'astro';
import { hypens } from '../../../utils/utils';

export const post: APIRoute = async ({ request }) => {
    const data = await request.formData();
    const title = data.get('title');
    let content = data.get('content');
    const type = data.get('type');
    const hash = data.get('hash') || hypens(title);
    const decorate = data.get('decorate') || 'none';
    const { db }: { db: Database } = await connectToDatabase();
    const quick_data = await db.collection('quicks').insertOne({
        title: title,
        content: content,
        type: type,
        hash: hash,
        decorate: decorate,
    });
    const result = {
        quick_data,
        hash
    };
    return new Response(JSON.stringify(result), {
        headers: { 'content-type': 'application/json' },
    });
};
