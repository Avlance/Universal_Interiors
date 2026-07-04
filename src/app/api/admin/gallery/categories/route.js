import { getDb } from '@/lib/mongodb';
import { apiOk, apiError } from '@/lib/api-response';

export const runtime = 'nodejs';

// GET all categories and subcategories
export async function GET() {
  try {
    const db = await getDb();
    const categories = await db.collection('design_gallery_category').find({}).toArray();
    return apiOk(categories, "Fetched categories successfully");
  } catch (err) {
    console.error('Error fetching categories:', err);
    return apiError("Failed to fetch categories");
  }
}

// POST: Add new category or subcategory
export async function POST(req) {
  try {
    const body = await req.json();
    const { action, name, categoryId, previewImage } = body;
    const db = await getDb();

    if (action === 'addCategory') {
      // Adding a main category
      if (!name) return apiError("Category name is required");
      const categorySlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      const exists = await db.collection('design_gallery_category').findOne({ category: categorySlug });
      if (exists) return apiError("Category already exists");

      await db.collection('design_gallery_category').insertOne({
        name: name,
        category: categorySlug,
        categoryItems: []
      });

      return apiOk(null, "Category added successfully");
    } 
    else if (action === 'addSubCategory') {
      // Adding a subcategory to an existing main category
      if (!categoryId || !name) return apiError("Category ID and subcategory name are required");
      const subCategorySlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

      await db.collection('design_gallery_category').updateOne(
        { category: categoryId },
        {
          $push: {
            categoryItems: {
              name: name,
              subCategory: subCategorySlug,
              count: 0,
              previewImage: previewImage || ""
            }
          }
        }
      );

      return apiOk(null, "Subcategory added successfully");
    }

    return apiError("Invalid action");
  } catch (err) {
    console.error('Error adding category:', err);
    return apiError("Failed to add category");
  }
}
