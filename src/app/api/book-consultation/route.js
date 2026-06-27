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
      email: email || "",
      city: city || "",
      whatsappUpdates: !!whatsappUpdates,
      createdAt: new Date()
    };

    await db.collection('book_consultations').insertOne(consultation);

    return apiCreated("Consultation booked successfully");
  } catch (err) {
    console.error('Error booking consultation:', err);
    return apiError("Failed to save consultation request.");
  }
}
