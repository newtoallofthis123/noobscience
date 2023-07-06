import { connectToDatabase, Database } from "../../../utils/db";

export const get = async () => {
    const { db }: { db: Database } = await connectToDatabase();
    const data = await db.collection('page').find({}).toArray();
    return new Response(JSON.stringify(data), {
        headers: { 'content-type': 'application/json' },
    })
}