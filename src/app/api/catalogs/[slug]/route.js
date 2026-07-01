import { getDb } from '@/lib/mongodb';
import { apiOk, apiError, apiNotFound } from '@/lib/api-response';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const db = await getDb();
    
    const catalog = await db.collection('catalogs').findOne({ slug });
    if (!catalog) return apiNotFound("Catalog not found");

    const cookieStore = await cookies();
    const token = cookieStore.get('catalog_session')?.value;
    const user = await verifyToken(token);

    const isAuthorized = !!user;
    
    let pages = catalog.pages || [];
    // TEASER MODE: Only show first 4 pages if not authenticated
    if (!isAuthorized) {
      pages = pages.slice(0, 4);
    }

    return apiOk({
      ...catalog,
      id: catalog._id.toString(),
      pages,
      isAuthorized,
      teaserLimit: 4
    }, "Fetched catalog details");
  } catch (err) {
    console.error(err);
    return apiError("Failed to fetch catalog details");
  }
}
