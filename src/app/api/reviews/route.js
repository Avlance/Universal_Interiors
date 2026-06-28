import { NextResponse } from 'next/server';

const MOCK_REVIEWS_RESPONSE = {
  reviews: [
    {
      author_name: "Siddharth Malhotra",
      profile_photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      rating: 5,
      text: "Universal Interiors transformed our 3BHK in Chennai into a stunning modern sanctuary. The design process was collaborative and the execution was absolute perfection. Highly recommended!",
      relative_time_description: "2 weeks ago"
    },
    {
      author_name: "Aishwarya Rao",
      profile_photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      rating: 5,
      text: "Excellent modular kitchen work! The space-saving fittings are extremely smart and convenient. The project was finished exactly on time as promised.",
      relative_time_description: "1 month ago"
    }
  ],
  overallRating: 4.9,
  totalReviews: 248,
  placeId: "mock-place-id"
};

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACES_PLACE_ID;

  if (!apiKey || !placeId || apiKey.startsWith('dummy')) {
    return NextResponse.json(MOCK_REVIEWS_RESPONSE);
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`;

  try {
    const response = await fetch(url, { next: { revalidate: 86400 } });
    const data = await response.json();

    if (data.status === 'OK') {
      return NextResponse.json({
        reviews: data.result.reviews || [],
        overallRating: data.result.rating,
        totalReviews: data.result.user_ratings_total,
        placeId: placeId
      });
    } else {
      console.warn(`Google Places API returned status ${data.status}, falling back to mock reviews.`);
      return NextResponse.json(MOCK_REVIEWS_RESPONSE);
    }
  } catch (error) {
    console.error('Error fetching Google Place reviews:', error);
    return NextResponse.json(MOCK_REVIEWS_RESPONSE);
  }
}
