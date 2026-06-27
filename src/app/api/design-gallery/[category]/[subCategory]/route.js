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

    // 1. Validate Category and Sub-category existence
    const catDoc = await db.collection('design_gallery_category').findOne({ category });
    if (!catDoc) {
      return apiNotFound(`Category not found: ${category}`);
    }

    const hasSubcat = catDoc.categoryItems?.some(
      item => item.subCategory.toLowerCase() === subCategory.toLowerCase()
    );
    if (!hasSubcat) {
      return apiNotFound(`Subcategory not found: ${subCategory} under category: ${category}`);
    }

    // 2. Query design gallery items with pagination (fetch 21 to check for hasMore)
    const results = await db.collection('design_gallery_category_items')
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

    return apiOk({ hasMore, items }, "Fetched gallery Items");
  } catch (err) {
    console.error('Error in design-gallery items pagination API:', err);
    return apiError("Failed to fetch gallery items");
  }
}
