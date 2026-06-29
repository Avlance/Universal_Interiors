import { getDb } from '@/lib/mongodb';
import { apiCreated, apiBadRequest, apiError } from '@/lib/api-response';
import { sendBookingConfirmationWhatsApp } from '@/lib/twilio';

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
    };

    await db.collection('book_consultations').insertOne(consultation);

    // ── WhatsApp marketing message (opt-in only) ───────────────────────────
    // Marketing / promotional messages are sent via WhatsApp ONLY — no SMS.
    if (whatsappUpdates) {
      try {
        await sendBookingConfirmationWhatsApp(phone, name);
        console.log(`[Twilio] WhatsApp booking confirmation sent to +91${phone}`);
      } catch (msgErr) {
        // Non-fatal — booking is already saved; just log the error
        console.error('[Twilio] Failed to send WhatsApp confirmation:', msgErr.message);
      }
    }

    return apiCreated("Consultation booked successfully");
  } catch (err) {
    console.error('Error booking consultation:', err);
    return apiError("Failed to save consultation request.");
  }
}
