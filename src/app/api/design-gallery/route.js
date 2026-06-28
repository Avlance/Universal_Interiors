import { getDb } from '@/lib/mongodb';
import { apiOk, apiError } from '@/lib/api-response';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const db = await getDb();

    // Fetch design gallery categories
    const categories = await db.collection('design_gallery_category')
      .find({})
      .toArray();

    if (!categories || categories.length === 0) {
      return apiOk([], "No design gallery data available");
    }

    const formattedData = categories.map(cat => ({
      name: cat.name,
      category: cat.category,
      categoryItems: (cat.categoryItems || []).map(item => ({
        name: item.name,
        subCategory: item.subCategory,
        count: item.count,
        previewImage: item.previewImage
      }))
    }));

    return apiOk(formattedData, "Fetched design gallery categories successfully");
  } catch (err) {
    console.error('Error in design-gallery API:', err);
    return apiError("Failed to fetch design gallery data");
  }
}
