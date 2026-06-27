import { getDb } from '@/lib/mongodb';
import { apiOk, apiError } from '@/lib/api-response';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const db = await getDb();

    // Fetch guides categories
    const guides = await db.collection('guides')
      .find({})
      .toArray();

    if (!guides || guides.length === 0) {
      return apiOk({ data: [] }, "No guides available");
    }

    const formattedData = guides.map(g => ({
      id: g._id.toString(),
      title: g.title,
      description: g.description,
      imageUrl: g.imageUrl,
      link: g.link
    }));

    return apiOk({ data: formattedData }, "Fetched guides successfully");
  } catch (err) {
    console.error('Error in guides API:', err);
    return apiError("Failed to fetch guides data");
  }
}
