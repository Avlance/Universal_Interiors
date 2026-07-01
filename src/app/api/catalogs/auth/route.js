import { getDb } from '@/lib/mongodb';
import { apiOk, apiError, apiBadRequest } from '@/lib/api-response';
import { signToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import twilio from 'twilio';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, phone, otp, name, email } = body;

    const db = await getDb();

    if (action === 'send') {
      if (!phone || !/^[6-9]\d{9}$/.test(phone)) return apiBadRequest("Invalid Indian phone number");
      
      const generatedOtp = String(Math.floor(100000 + Math.random() * 900000));
      await db.collection('catalog_otps').replaceOne(
        { _id: phone },
        { phone, otp: generatedOtp, createdAt: new Date() },
        { upsert: true }
      );

      const twilioSid = process.env.TWILIO_ACCOUNT_SID;
      const twilioToken = process.env.TWILIO_AUTH_TOKEN;
      const twilioFromSMS = process.env.TWILIO_FROM_SMS;

      if (twilioSid && twilioToken && twilioFromSMS) {
        const client = twilio(twilioSid, twilioToken);
        try {
          await client.messages.create({
            body: `Your Universal Interiors Catalog verification code is ${generatedOtp}`,
            from: twilioFromSMS,
            to: `+91${phone}`
          });
        } catch (smsErr) {
          console.error("Twilio SMS failed:", smsErr);
          return apiError("Failed to send SMS via Twilio. Check your Twilio balance and verified numbers.");
        }
      } else {
        console.log(`\n=== MOCK OTP FOR CATALOG [+91${phone}]: ${generatedOtp} ===\n`);
      }

      return apiOk(null, "OTP sent successfully");
    } 
    else if (action === 'verify') {
      if (!phone || !otp) return apiBadRequest("Missing phone or OTP");
      
      const record = await db.collection('catalog_otps').findOne({ _id: phone });
      if (!record || record.otp !== otp) {
        return apiBadRequest("Invalid or expired OTP");
      }

      // Valid OTP. Create or update lead.
      await db.collection('catalog_leads').updateOne(
        { phone },
        { $set: { phone, name, email, lastVerifiedAt: new Date() } },
        { upsert: true }
      );

      // Set session cookie
      const token = await signToken({ phone, name });
      const cookieStore = await cookies();
      cookieStore.set('catalog_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: '/'
      });

      // Cleanup OTP
      await db.collection('catalog_otps').deleteOne({ _id: phone });

      return apiOk(null, "Verified successfully");
    }

    return apiBadRequest("Invalid action");
  } catch (err) {
    console.error(err);
    return apiError("Internal server error");
  }
}
