import { getDb } from '@/lib/mongodb';
import { apiOk, apiBadRequest, apiError } from '@/lib/api-response';
import { sendOTPMessage } from '@/lib/twilio';

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_OTP_REQUESTS = 3;

export async function POST(request) {
  try {
    const body = await request.json();
    const { phone, channel } = body;

    // ── Validate phone ──────────────────────────────────────────────────────
    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      return apiBadRequest("Invalid phone number format. Must be a 10-digit number starting with 6-9.");
    }

    // ── Validate channel ────────────────────────────────────────────────────
    if (!channel || !['sms', 'whatsapp'].includes(channel)) {
      return apiBadRequest("Invalid channel. Must be 'sms' or 'whatsapp'.");
    }

    // ── Rate limiting ───────────────────────────────────────────────────────
    const db  = await getDb();
    const now = Date.now();

    const existing = await db.collection('otp_verifications').findOne({ _id: phone });
    if (existing) {
      const requestCount = existing.requestCount || 1;
      const windowStart  = existing.windowStart  || existing.createdAt || 0;

      if ((now - windowStart) < RATE_LIMIT_WINDOW_MS && requestCount >= MAX_OTP_REQUESTS) {
        const waitMinutes = Math.ceil((RATE_LIMIT_WINDOW_MS - (now - windowStart)) / 60000);
        return apiBadRequest(`Too many OTP requests. Please wait ${waitMinutes} minute(s) before trying again.`);
      }
    }

    // ── Generate OTP ────────────────────────────────────────────────────────
    const otp    = String(Math.floor(100000 + Math.random() * 900000));
    const expiry = new Date(now + 10 * 60 * 1000);

    const isNewWindow  = !existing || (now - (existing.windowStart || 0)) >= RATE_LIMIT_WINDOW_MS;
    const requestCount = isNewWindow ? 1 : (existing.requestCount || 1) + 1;
    const windowStart  = isNewWindow ? now : (existing.windowStart || now);

    const otpDocument = {
      _id:          phone,
      phone,
      otp,
      channel,            // store which channel was used
      createdAt:    now,
      expireAt:     expiry,
      requestCount,
      windowStart,
    };

    await db.collection('otp_verifications').replaceOne(
      { _id: phone },
      otpDocument,
      { upsert: true }
    );

    // ── Send via Twilio ─────────────────────────────────────────────────────
    const twilioSid   = process.env.TWILIO_ACCOUNT_SID;
    const twilioToken = process.env.TWILIO_AUTH_TOKEN;

    if (twilioSid && twilioToken) {
      await sendOTPMessage(phone, otp, channel);
      console.log(`[Twilio] OTP sent via ${channel.toUpperCase()} to +91${phone}`);
    } else {
      // Local dev fallback — log OTP to console
      console.log(`\n========================================`);
      console.log(`[LOCAL DEV OTP] Channel: ${channel.toUpperCase()}`);
      console.log(`[LOCAL DEV OTP] Code for +91${phone}: ${otp}`);
      console.log(`========================================\n`);
    }

    const channelLabel = channel === 'whatsapp' ? 'WhatsApp' : 'SMS';
    return apiOk(null, `OTP sent successfully via ${channelLabel}.`);
  } catch (err) {
    console.error('Error generating and sending OTP:', err);
    return apiError("Failed to generate or send OTP.");
  }
}
