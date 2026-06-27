import { getDb } from '@/lib/mongodb';
import { apiCreated, apiBadRequest, apiError } from '@/lib/api-response';

export async function POST(request) {
  try {
    const body = await request.json();
    const { phone, whatsappUpdates, pinCode } = body;

    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      return apiBadRequest("Invalid phone number format.");
    }
    if (!pinCode || !/^\d{6}$/.test(pinCode)) {
      return apiBadRequest("PinCode is required and must be exactly 6 digits.");
    }

    const db = await getDb();
    const liveConsultation = {
      phone,
      whatsappUpdates: !!whatsappUpdates,
      pinCode,
      createdAt: new Date()
    };

    await db.collection('live_consultations').insertOne(liveConsultation);

    return apiCreated("Your consultation is booked. We will reach out to you shortly.");
  } catch (err) {
    console.error('Error in live consultation API:', err);
    return apiError("Failed to save live consultation request.");
  }
}
