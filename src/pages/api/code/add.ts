import { connectToDatabase, Database } from '../../../utils/db';
import type { APIRoute } from 'astro';
import { ranHash } from '../../../utils/utils';

export const post: APIRoute = async ({ request }) => {
    const body = await request.json();
    console.log(body);
    const { title, code, author, language } = body;
    const hash = ranHash();

    const { db }: { db: Database } = await connectToDatabase();

    const insertResult = await db.collection('code').insertOne({
        title,
        code,
        author,
        hash,
        language,
    });

    const result = {
        insertResult,
        hash,
    };

    return new Response(JSON.stringify(result), {
        headers: { 'content-type': 'application/json' },
    });
};
