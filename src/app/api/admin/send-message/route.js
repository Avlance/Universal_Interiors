import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function POST(request) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { phones, message, channel } = await request.json();

    if (!phones || !Array.isArray(phones) || phones.length === 0) {
      return NextResponse.json({ error: 'Phones array is required' }, { status: 400 });
    }

    if (!message) {
      return NextResponse.json({ error: 'Message content is required' }, { status: 400 });
    }

    const results = { successful: 0, failed: 0, errors: [] };

    const WHATSAPP_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
    const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

    // Send messages in parallel
    const promises = phones.map(async (phone) => {
      try {
        if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
          console.log(`[WhatsApp Sync Pending] Simulated message to ${phone}: ${message}`);
          results.successful++;
          return;
        }

        const metaRes = await fetch(`https://graph.facebook.com/v17.0/${PHONE_NUMBER_ID}/messages`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: phone.replace('+', ''),
            type: "text",
            text: {
              body: message
            }
          })
        });

        const metaData = await metaRes.json();
        
        if (!metaRes.ok) {
          throw new Error(metaData?.error?.message || "Meta API Error");
        }

        results.successful++;
      } catch (err) {
        console.error(`Failed to send message to ${phone}:`, err.message);
        results.failed++;
        results.errors.push({ phone, error: err.message });
      }
    });

    await Promise.allSettled(promises);

    return NextResponse.json({ success: true, results });
  } catch (err) {
    console.error('Error sending custom message:', err);
    return NextResponse.json({ error: 'Failed to dispatch messages' }, { status: 500 });
  }
}
