import { getDb } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json({ error: "Phone is required." }, { status: 400 });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60000); // 10 minutes from now

    const db = await getDb();
    
    // Upsert the OTP into MongoDB
    await db.collection('otp_codes').replaceOne(
      { phone },
      { phone, code: otpCode, expiresAt },
      { upsert: true }
    );

    // Call Meta's WhatsApp Cloud API
    const WHATSAPP_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
    const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
    
    if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
      console.warn("Meta WhatsApp API keys missing! Simulating OTP delivery for dev:", otpCode);
      return NextResponse.json({ success: true, message: "Simulated OTP sent." });
    }

    const metaRes = await fetch(`https://graph.facebook.com/v17.0/${PHONE_NUMBER_ID}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: phone.replace('+', ''), // Meta requires country code without +
        type: "template",
        template: {
          name: "otp_verification",
          language: { code: "en_US" },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: otpCode },
                { type: "text", text: "10" } // Usually expiration time or app identifier
              ]
            },
            {
              type: "button",
              sub_type: "url",
              index: "0",
              parameters: [
                { type: "text", text: otpCode }
              ]
            }
          ]
        }
      })
    });

    const metaData = await metaRes.json();
    
    if (!metaRes.ok) {
      console.error("Meta API Error:", metaData);
      return NextResponse.json({ 
        error: "Failed to send WhatsApp message via Meta.",
        details: metaData
      }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "WhatsApp OTP sent successfully." });

  } catch (error) {
    console.error("WhatsApp Send OTP Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
