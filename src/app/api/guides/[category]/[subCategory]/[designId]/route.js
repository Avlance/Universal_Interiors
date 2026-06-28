import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { apiOk, apiError, apiNotFound } from '@/lib/api-response';

export const runtime = 'nodejs';

export async function GET(request, { params }) {
  try {
    const { category, subCategory, designId } = await params;
    const db = await getDb();

    // Query guide item by ID
    let objectId;
    try {
      objectId = new ObjectId(designId);
    } catch (err) {
      return apiError("Invalid design ID format", 400);
    }

    const item = await db.collection('guide_items').findOne({
      _id: objectId,
      category,
      subCategory
    });

    if (!item) {
      return apiNotFound(`Guide item not found: ${designId}`);
    }

    // Format the response document
    const formattedItem = {
      id: item._id.toString(),
      name: item.name,
      category: item.category,
      subCategory: item.subCategory,
      previewImage: item.previewImage,
      description: item.description,
      childImages: item.childImages || []
    };

    return apiOk(formattedItem, "Fetched particular guide details successfully");
  } catch (err) {
    console.error('Error fetching particular guide details:', err);
    return apiError("Failed to fetch guide details");
  }
}
