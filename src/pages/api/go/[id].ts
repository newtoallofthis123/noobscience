import { connectToDatabase, type Database } from '../../../utils/db';

export const GET = async (req: any) => {
    const { db }: { db: Database } = await connectToDatabase();
    const { id } = req.params;

    const data = await db.collection('go').findOne({
        slug: id,
    });

    if (!data) {
        return new Response(null, { status: 404 });
    }

    // update the count of views
    await db.collection('go').updateOne(
        {
            slug: id,
        },
        {
            $inc: {
                count: 1,
            },
        }
    );

    return new Response(JSON.stringify(data), {
        headers: { 'content-type': 'application/json' },
    });
};
