import { getDb } from '@/lib/mongodb';
import { apiCreated, apiBadRequest, apiError } from '@/lib/api-response';

export async function POST(request) {
  try {
    const body = await request.json();
    const { propertyType, purpose, scope, name, phone, email, city, whatsappQuote } = body;

    if (!propertyType || !purpose || !scope || !name || !phone || !email || !city) {
      return apiBadRequest("All fields are required.");
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      return apiBadRequest("Invalid phone number format. Must be a 10-digit number starting with 6-9.");
    }

    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
      return apiBadRequest("Invalid email address format.");
    }

    const db = await getDb();
    const estimation = {
      _id: phone,
      propertyType,
      purpose,
      scope,
      name,
      phone,
      email,
      city,
      whatsappQuote: !!whatsappQuote,
      createdAt: new Date()
    };

    await db.collection('quote_estimation').replaceOne(
      { _id: phone },
      estimation,
      { upsert: true }
    );

    return apiCreated("Estimation request submitted successfully");
  } catch (err) {
    console.error('Error saving quote estimation:', err);
    return apiError("Failed to save estimation request.");
  }
}
