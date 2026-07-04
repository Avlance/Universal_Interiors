import { getDb } from '@/lib/mongodb';
import { apiOk, apiError } from '@/lib/api-response';
import { ObjectId } from 'mongodb';

export const runtime = 'nodejs';

// GET items for admin view
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const subCategory = searchParams.get('subCategory');
    
    if (!category || !subCategory) {
      return apiError("Category and subCategory are required");
    }

    const db = await getDb();
    const items = await db.collection('design_gallery_category_items')
      .find({ category, subCategory })
      .sort({ _id: -1 }) // Newest first
      .toArray();

    const formattedItems = items.map(item => ({
      id: item._id.toString(),
      name: item.name,
      previewImage: item.previewImage,
      category: item.category,
      subCategory: item.subCategory
    }));

    return apiOk({ items: formattedItems }, "Fetched items successfully");
  } catch (err) {
    console.error('Error fetching gallery items:', err);
    return apiError("Failed to fetch items");
  }
}

// POST: Add new item
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, category, subCategory, previewImage } = body;

    if (!name || !category || !subCategory || !previewImage) {
      return apiError("Missing required fields");
    }

    const db = await getDb();

    // 1. Insert the new image
    const result = await db.collection('design_gallery_category_items').insertOne({
      name,
      category,
      subCategory,
      previewImage,
      createdAt: new Date()
    });

    // 2. Increment the count in the category document
    await db.collection('design_gallery_category').updateOne(
      { 
        category: category,
        "categoryItems.subCategory": subCategory 
      },
      { 
        $inc: { "categoryItems.$.count": 1 } 
      }
    );

    return apiOk({ id: result.insertedId }, "Item added successfully");
  } catch (err) {
    console.error('Error adding gallery item:', err);
    return apiError("Failed to add item");
  }
}

// DELETE: Remove item
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const category = searchParams.get('category');
    const subCategory = searchParams.get('subCategory');

    if (!id || !category || !subCategory) {
      return apiError("Missing id, category, or subCategory");
    }

    const db = await getDb();

    // 1. Delete the item
    const result = await db.collection('design_gallery_category_items').deleteOne({ 
      _id: new ObjectId(id) 
    });

    if (result.deletedCount === 0) {
      return apiError("Item not found");
    }

    // 2. Decrement the count
    await db.collection('design_gallery_category').updateOne(
      { 
        category: category,
        "categoryItems.subCategory": subCategory 
      },
      { 
        $inc: { "categoryItems.$.count": -1 } 
      }
    );

    return apiOk(null, "Item deleted successfully");
  } catch (err) {
    console.error('Error deleting gallery item:', err);
    return apiError("Failed to delete item");
  }
}
