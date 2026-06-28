import { getDb } from '@/lib/mongodb';
import { apiOk, apiError, apiNotFound } from '@/lib/api-response';

export const runtime = 'nodejs';

const PAGE_SIZE = 20;

export async function GET(request, { params }) {
  try {
    const { category, subCategory } = await params;
    const { searchParams } = new URL(request.url);
    const offset = parseInt(searchParams.get('offset') || '0', 10) || 0;

    const db = await getDb();

    // 1. Validate Category existence
    const catDoc = await db.collection('guides').findOne({ category });
    if (!catDoc) {
      return apiNotFound(`Guide category not found: ${category}`);
    }

    // 2. Query guide items with pagination
    const results = await db.collection('guide_items')
      .find({ category, subCategory })
      .skip(offset)
      .limit(PAGE_SIZE + 1)
      .toArray();

    const hasMore = results.length > PAGE_SIZE;
    const items = results.slice(0, PAGE_SIZE).map(item => ({
      id: item._id.toString(),
      name: item.name,
      previewImage: item.previewImage
    }));

    return apiOk({ hasMore, items }, "Fetched guide items");
  } catch (err) {
    console.error('Error in guides items pagination API:', err);
    return apiError("Failed to fetch guide items");
  }
}
