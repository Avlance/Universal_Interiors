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

    // Send messages in parallel (WhatsApp Sync Pending)
    const promises = phones.map(async (phone) => {
      try {
        // WhatsApp Business integration goes here.
        console.log(`[WhatsApp Sync Pending] Message to ${phone}: ${message}`);
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
