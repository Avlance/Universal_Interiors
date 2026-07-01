import { getDb } from '@/lib/mongodb';
import { apiOk, apiError } from '@/lib/api-response';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const db = await getDb();
    const catalogs = await db.collection('catalogs').find({}).project({ pages: 0 }).toArray();
    return apiOk(catalogs.map(c => ({...c, id: c._id.toString()})), "Fetched catalogs");
  } catch (err) {
    console.error(err);
    return apiError("Failed to fetch catalogs");
  }
}
