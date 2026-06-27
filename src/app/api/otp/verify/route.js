import { getDb } from '@/lib/mongodb';
import { apiOk, apiBadRequest, apiError } from '@/lib/api-response';

export async function POST(request) {
  try {
    const body = await request.json();
    const { phone, otp } = body;

    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      return apiBadRequest("Invalid phone number format.");
    }
    if (!otp || !/^\d{6}$/.test(otp)) {
      return apiBadRequest("OTP must be exactly 6 digits.");
    }

    const db = await getDb();
    
    const entry = await db.collection('otp_verifications').findOne({ _id: phone });

    if (!entry) {
      return apiBadRequest("OTP has expired. Please request a new one.");
    }

    const now = Date.now();
    const expiry = new Date(entry.expireAt).getTime();
    if (now > expiry) {
      await db.collection('otp_verifications').deleteOne({ _id: phone });
      return apiBadRequest("OTP has expired. Please request a new one.");
    }

    if (entry.otp !== otp) {
      return apiBadRequest("Invalid OTP");
    }

    await db.collection('otp_verifications').deleteOne({ _id: phone });

    return apiOk(null, "OTP verified successfully");
  } catch (err) {
    console.error('Error verifying OTP:', err);
    return apiError("Failed to verify OTP.");
  }
}
