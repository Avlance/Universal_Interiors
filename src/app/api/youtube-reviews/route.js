import { getDb } from '@/lib/mongodb';
import { apiOk, apiError } from '@/lib/api-response';

export const runtime = 'nodejs';
// Cache the API route response for 1 hour (3600 seconds) to conserve YouTube API quota
export const revalidate = 3600;

const FALLBACK_YOUTUBE_DATA = [
  {
    youtubeLink: "https://youtu.be/E8esg9WwnHQ",
    reviewerName: "Mrs & Mr. Parthasarathy",
    reviewDescription: "Watch the home interior journey and review by Mrs. and Mr. Parthasarathy from Thuraipakkam, Chennai.",
    place: "Thuraipakkam, Chennai",
    thumbnail: "https://img.youtube.com/vi/E8esg9WwnHQ/hqdefault.jpg"
  },
  {
    youtubeLink: "https://youtu.be/M1MRCE9JI7I",
    reviewerName: "Mrs. Anitha",
    reviewDescription: "Watch the home interior journey and review by Mrs. Anitha from Pallikaranai, Chennai.",
    place: "Pallikaranai, Chennai",
    thumbnail: "https://img.youtube.com/vi/M1MRCE9JI7I/hqdefault.jpg"
  },
  {
    youtubeLink: "https://youtu.be/FxTen1gPoKY",
    reviewerName: "Mr. Kiran",
    reviewDescription: "Watch the home interior journey and review by Mr. Kiran from Nanganallur, Chennai.",
    place: "Nanganallur, Chennai",
    thumbnail: "https://img.youtube.com/vi/FxTen1gPoKY/hqdefault.jpg"
  },
  {
    youtubeLink: "https://youtu.be/2u_FhqpRliM",
    reviewerName: "Mr. Karthikeyan",
    reviewDescription: "Watch the home interior journey and review by Mr. Karthikeyan from Adambakkam, Chennai.",
    place: "Adambakkam, Chennai",
    thumbnail: "https://img.youtube.com/vi/2u_FhqpRliM/hqdefault.jpg"
  },
  {
    youtubeLink: "https://youtu.be/X65pzJvUXcs",
    reviewerName: "Mr. Debashish",
    reviewDescription: "Watch the home interior journey and review by Mr. Debashish from Madipakkam, Chennai.",
    place: "Madipakkam, Chennai",
    thumbnail: "https://img.youtube.com/vi/X65pzJvUXcs/hqdefault.jpg"
  },
  {
    youtubeLink: "https://youtu.be/r9j_4qLg9r4",
    reviewerName: "Mr. Rajagopalan & Mrs. Latha",
    reviewDescription: "Watch the home interior journey and review by Mr. Rajagopalan and Mrs. Latha from Adambakkam, Chennai.",
    place: "Adambakkam, Chennai",
    thumbnail: "https://img.youtube.com/vi/r9j_4qLg9r4/hqdefault.jpg"
  },
  {
    youtubeLink: "https://youtu.be/bkZwhFzw0Vw",
    reviewerName: "Mrs. Munu Krishna Reddy",
    reviewDescription: "Watch the home interior journey and review by Mrs. Munu Krishna Reddy from Shenoy Nagar, Chennai.",
    place: "Shenoy Nagar, Chennai",
    thumbnail: "https://img.youtube.com/vi/bkZwhFzw0Vw/hqdefault.jpg"
  }
];

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const playlistId = process.env.YOUTUBE_PLAYLIST_ID;

  if (apiKey && playlistId) {
    try {
      const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=10&key=${apiKey}`;
      const response = await fetch(url, { next: { revalidate: 3600 } });

      if (response.ok) {
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          const formatted = data.items.map(item => {
            const snippet = item.snippet || {};
            const videoId = snippet.resourceId?.videoId || '';
            const title = snippet.title || 'Client Testimonial';
            const description = snippet.description || '';
            
            // Extract location from title or description if possible, otherwise default to Chennai
            let place = 'Chennai';
            if (title.toLowerCase().includes('bangalore') || description.toLowerCase().includes('bangalore')) {
              place = 'Bangalore';
            } else {
              // Try to find specific areas mentioned in description/title
              const areas = ['Thuraipakkam', 'Pallikaranai', 'Nanganallur', 'Adambakkam', 'Madipakkam', 'Shenoy Nagar'];
              const foundArea = areas.find(area => title.toLowerCase().includes(area.toLowerCase()) || description.toLowerCase().includes(area.toLowerCase()));
              if (foundArea) {
                place = `${foundArea}, Chennai`;
              }
            }

            // Extract cleaner reviewer name from title (e.g. "Review by Mrs. Anitha" or "Mrs. Anitha Home Tour")
            let reviewerName = title;
            const matchName = title.match(/(?:by|from|with)\s+([A-Za-z\s.&]+?)(?:\s+Home|\s+Interior|\s+Review|\s+Kitchen|$)/i);
            if (matchName && matchName[1]) {
              reviewerName = matchName[1].trim();
            } else {
              // Fallback to cleaning up generic title prefixes
              reviewerName = title.split('|')[0].split('-')[0].trim();
            }

            // Get the best available thumbnail
            const thumbs = snippet.thumbnails || {};
            const thumbnail = thumbs.maxres?.url || thumbs.high?.url || thumbs.medium?.url || thumbs.default?.url || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

            return {
              youtubeLink: `https://youtu.be/${videoId}`,
              reviewerName,
              reviewDescription: description.substring(0, 150) + (description.length > 150 ? '...' : ''),
              place,
              thumbnail
            };
          });

          return apiOk(formatted, "YouTube customer reviews fetched successfully from Channel API");
        }
      } else {
        console.error('YouTube API returned non-200 status:', response.status);
      }
    } catch (err) {
      console.error('Error fetching from YouTube API:', err);
    }
  }

  // Fallback to DB or Hardcoded data if API is disabled or fails
  try {
    const db = await getDb();
    const reviews = await db.collection('youtube_reviews').find({}).toArray();

    if (reviews && reviews.length > 0) {
      const formatted = reviews.map(r => ({
        youtubeLink: r.youtubeLink || `https://youtu.be/${r.videoId}`,
        reviewerName: r.reviewerName || r.title,
        reviewDescription: r.reviewDescription || '',
        place: r.place || '',
        thumbnail: r.thumbnail || (r.videoId ? `https://img.youtube.com/vi/${r.videoId}/hqdefault.jpg` : '')
      }));
      return apiOk(formatted, "YouTube customer reviews fetched successfully");
    }
  } catch (err) {
    console.error('Error fetching YouTube reviews from DB fallback:', err);
  }

  return apiOk(FALLBACK_YOUTUBE_DATA, "YouTube customer reviews fetched successfully (Mock Fallback)");
}
