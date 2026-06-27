import { getDb } from '@/lib/mongodb';
import { apiOk, apiError } from '@/lib/api-response';

export const runtime = 'nodejs';

const FALLBACK_YOUTUBE_DATA = [
  {
    videoId: "dQw4w9WgXcQ", // Dummy video ID
    title: "Universal Interiors Home Tour - The 4BHK Masterpiece",
    thumbnail: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=400&fit=crop"
  },
  {
    videoId: "jNQXAC9IVRw",
    title: "Client Testimonial: How Universal Interiors Transformed Our Kitchen",
    thumbnail: "https://images.unsplash.com/photo-1556910103-1c02745a872e?w=600&h=400&fit=crop"
  }
];

export async function GET() {
  try {
    const db = await getDb();
    
    // Attempt to fetch from DB
    const reviews = await db.collection('youtube_reviews')
      .find({})
      .toArray();

    if (reviews && reviews.length > 0) {
      const formatted = reviews.map(r => ({
        videoId: r.videoId,
        title: r.title,
        thumbnail: r.thumbnail
      }));
      return apiOk(formatted, "YouTube customer reviews fetched successfully");
    } else {
      // Return mock data if empty
      return apiOk(FALLBACK_YOUTUBE_DATA, "YouTube customer reviews fetched successfully (Mock Fallback)");
    }
  } catch (err) {
    console.error('Error fetching YouTube reviews:', err);
    return apiOk(FALLBACK_YOUTUBE_DATA, "YouTube customer reviews fetched successfully (Mock Fallback)");
  }
}
