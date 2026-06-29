/**
 * Twilio helper — shared singleton for all server-side message sending.
 *
 * OTP:       channel = "sms" | "whatsapp"  (user's choice)
 * Marketing: WhatsApp only (no SMS)
 */

import twilio from 'twilio';

// ─── Credentials ─────────────────────────────────────────────────────────────
const ACCOUNT_SID   = process.env.TWILIO_ACCOUNT_SID;
const AUTH_TOKEN    = process.env.TWILIO_AUTH_TOKEN;
const FROM_SMS      = process.env.TWILIO_FROM_SMS;          // e.g. "+14155000000"
const FROM_WHATSAPP = process.env.TWILIO_FROM_WHATSAPP;     // e.g. "whatsapp:+14155238886"

// ─── Lazy client ─────────────────────────────────────────────────────────────
function getClient() {
  if (!ACCOUNT_SID || !AUTH_TOKEN) {
    throw new Error('[Twilio] TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN is missing in .env');
  }
  return twilio(ACCOUNT_SID, AUTH_TOKEN);
}

// ─── OTP delivery (SMS or WhatsApp, user-chosen) ─────────────────────────────
/**
 * @param {string} phone   - 10-digit Indian number, e.g. "9876543210"
 * @param {string} otp     - 6-digit code
 * @param {'sms'|'whatsapp'} channel
 */
export async function sendOTPMessage(phone, otp, channel) {
  const client = getClient();
  const to     = `+91${phone}`;
  const body   = `Your Universal Interiors verification code is: *${otp}*\nThis code expires in 10 minutes. Do not share it with anyone.`;

  if (channel === 'whatsapp') {
    if (!FROM_WHATSAPP) throw new Error('[Twilio] TWILIO_FROM_WHATSAPP is missing in .env');
    return client.messages.create({
      from: FROM_WHATSAPP,
      to:   `whatsapp:${to}`,
      body,
    });
  }

  // Default → SMS
  if (!FROM_SMS) throw new Error('[Twilio] TWILIO_FROM_SMS is missing in .env');
  return client.messages.create({
    from: FROM_SMS,
    to,
    body,
  });
}

// ─── Marketing / booking confirmation (WhatsApp only) ────────────────────────
/**
 * Send a WhatsApp booking-confirmation / welcome message.
 * Only called when the user opted in (whatsappUpdates === true).
 *
 * @param {string} phone - 10-digit Indian number
 * @param {string} name  - customer name (optional, for personalisation)
 */
export async function sendBookingConfirmationWhatsApp(phone, name) {
  if (!FROM_WHATSAPP) {
    console.warn('[Twilio] TWILIO_FROM_WHATSAPP not set — skipping WhatsApp confirmation.');
    return;
  }
  const client = getClient();
  const greeting = name ? `Hi ${name}! 👋` : 'Hi there! 👋';
  const body = `${greeting}\n\nThank you for booking a consultation with *Universal Interiors*! 🏠✨\n\nOur design expert will reach out to you shortly to schedule your free session.\n\nIn the meantime, explore our portfolio at universalinteriors.in\n\n— Team Universal Interiors`;

  return client.messages.create({
    from: FROM_WHATSAPP,
    to:   `whatsapp:+91${phone}`,
    body,
  });
}
