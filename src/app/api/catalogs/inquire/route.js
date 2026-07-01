import { getDb } from '@/lib/mongodb';
import { apiOk, apiError, apiBadRequest } from '@/lib/api-response';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const body = await request.json();
    const { phone, name, email, catalogSlug, pageIndex, designId } = body;

    if (!phone) return apiBadRequest("Phone number is required");

    const db = await getDb();
    
    await db.collection('catalog_inquiries').insertOne({
      phone,
      name,
      email,
      catalogSlug,
      pageIndex,
      designId,
      createdAt: new Date()
    });

    return apiOk(null, "Inquiry submitted successfully");
  } catch (err) {
    console.error(err);
    return apiError("Internal server error");
  }
}
