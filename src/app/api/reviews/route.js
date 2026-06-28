import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACES_PLACE_ID;

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`;

  try {
    const response = await fetch(url, { next: { revalidate: 86400 } }); // Caches data for 24 hours to save API quota
    const data = await response.json();

    if (data.status === 'OK') {
      return NextResponse.json({
        reviews: data.result.reviews || [],
        overallRating: data.result.rating,
        totalReviews: data.result.user_ratings_total,
        placeId: placeId
      });
    } else {
      return NextResponse.json({ error: `Google API Error: ${data.status}` }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reviews data' }, { status: 500 });
  }
}
