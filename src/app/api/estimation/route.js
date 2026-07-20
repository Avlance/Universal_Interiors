import { getDb } from '@/lib/mongodb';
import { apiCreated, apiBadRequest, apiError } from '@/lib/api-response';

export async function POST(request) {
  try {
    const body = await request.json();
    const { propertyType, purpose, scope, name, phone, email, city, whatsappQuote, whatsappUpdates, packageIndex, customization } = body;

    if (!name || !phone || !email || !city) {
      return apiBadRequest("Name, phone, email and city are required.");
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
      propertyType: propertyType || '',
      purpose: purpose || '',
      scope: scope || '',
      packageIndex: packageIndex !== undefined ? packageIndex : null,
      customization: customization || null,
      name,
      phone,
      email,
      city,
      whatsappUpdates: !!whatsappUpdates || !!whatsappQuote,
      createdAt: new Date(),
      status: "New"
    };

    await db.collection('quote_estimation').replaceOne(
      { _id: phone },
      estimation,
      { upsert: true }
    );

    // Marketing / promotional messages will be integrated with WhatsApp Business API later.
    if (whatsappUpdates || whatsappQuote) {
      console.log(`[WhatsApp Sync Pending] User opted-in for updates: +91${phone}`);
    }

    return apiCreated("Estimation request submitted successfully");
  } catch (err) {
    console.error('Error saving quote estimation:', err);
    return apiError("Failed to save estimation request.");
  }
}
