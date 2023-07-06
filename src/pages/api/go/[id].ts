import { connectToDatabase, Database } from '../../../utils/db';

export const get = async (req: any) => {
    const { db }: { db: Database } = await connectToDatabase();
    const { id } = req.params;

    const data = await db.collection('go').findOne({
        slug: id,
    });

    if (!data) {
        return new Response('Data not found', { status: 404 });
    }

    return new Response(JSON.stringify(data), {
        headers: { 'content-type': 'application/json' },
    });
};
