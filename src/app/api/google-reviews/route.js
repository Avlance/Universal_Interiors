import { apiOk } from '@/lib/api-response';

const MOCK_REVIEWS = {
  totalReviews: 248,
  overallRating: 4.9,
  data: [
    {
      customerName: "Siddharth Malhotra",
      profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      rating: 5,
      review: "Universal Interiors transformed our 3BHK in Bangalore into a stunning modern sanctuary. The design process was collaborative and the execution was absolute perfection. Highly recommended!",
      date: "June 12, 2026"
    },
    {
      customerName: "Aishwarya Rao",
      profilePhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      rating: 5,
      review: "Excellent modular kitchen work! The space-saving fittings are extremely smart and convenient. The project was finished exactly on time as promised.",
      date: "May 28, 2026"
    }
  ]
};

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACES_PLACE_ID;

  if (!apiKey || !placeId || apiKey.startsWith('dummy')) {
    return apiOk(MOCK_REVIEWS, "Google reviews fetched successfully (Mock Fallback)");
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total&key=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Google API returned non-success response: ${response.status}`);
    }

    const body = await response.json();
    const result = body.result || {};
    const rawReviews = result.reviews || [];
    
    const sortedReviews = [...rawReviews].sort((a, b) => (b.time || 0) - (a.time || 0));
    
    const formattedReviews = sortedReviews.slice(0, 5).map(r => ({
      customerName: r.author_name,
      profilePhoto: r.profile_photo_url,
      rating: r.rating || 0,
      review: r.text || "",
      date: new Date((r.time || 0) * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    }));

    return apiOk({
      totalReviews: result.user_ratings_total || sortedReviews.length,
      overallRating: result.rating || 0.0,
      data: formattedReviews
    }, "Google reviews fetched successfully");
  } catch (err) {
    console.error('Error fetching Google reviews:', err);
    return apiOk(MOCK_REVIEWS, "Google reviews fetched successfully (Mock Fallback)");
  }
}
