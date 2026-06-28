import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { apiOk, apiError, apiNotFound } from '@/lib/api-response';

export const runtime = 'nodejs';

export async function GET(request, { params }) {
  try {
    const { category, subCategory, designId } = await params;

    const db = await getDb();

    // Query design gallery item by ID
    let objectId;
    try {
      objectId = new ObjectId(designId);
    } catch (err) {
      return apiError("Invalid design ID format", 400);
    }

    const item = await db.collection('design_gallery_category_items').findOne({
      _id: objectId,
      category,
      subCategory
    });

    if (!item) {
      return apiNotFound(`Design item not found: ${designId}`);
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

    return apiOk(formattedItem, "Fetched particular design details successfully");
  } catch (err) {
    console.error('Error fetching particular design details:', err);
    return apiError("Failed to fetch design details");
  }
}
