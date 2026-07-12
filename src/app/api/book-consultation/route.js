import { getDb } from '@/lib/mongodb';
import { apiCreated, apiBadRequest, apiError } from '@/lib/api-response';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, city, whatsappUpdates } = body;

    if (!name || !phone) {
      return apiBadRequest("Name and phone number are required fields.");
    }

    const db = await getDb();
    const consultation = {
      name,
      phone,
      email:           email || "",
      city:            city  || "",
      whatsappUpdates: !!whatsappUpdates,
      createdAt:       new Date(),
      status:          "New"
    };

    await db.collection('book_consultations').insertOne(consultation);

    // Marketing / promotional messages will be integrated with WhatsApp Business API later.
    if (whatsappUpdates) {
      console.log(`[WhatsApp Sync Pending] User opted-in for updates: +91${phone}`);
    }

    return apiCreated("Consultation booked successfully");
  } catch (err) {
    console.error('Error booking consultation:', err);
    return apiError("Failed to save consultation request.");
  }
}
