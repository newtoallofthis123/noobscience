import { ranHash } from '../../../utils/utils';
import { connectToDatabase, type Database } from '../../../utils/db';

export const GET = async () => {
    return new Response(
        "I'm not going to expose all the go links for the sake of privacy",
        {
            headers: { 'content-type': 'application/json' },
        }
    );
};

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
    const data = await request.formData();
    const url = data.get('url');
    const slug = data.get('slug') || ranHash();
    const count = 0;
    const { db }: { db: Database } = await connectToDatabase();
    const go_data = await db.collection('go').insertOne({
        url: url,
        slug: slug,
        count: count,
    });
    const result = {
        go_data,
        slug,
    };
    return new Response(JSON.stringify(result), {
        headers: { 'content-type': 'application/json' },
    });
};
