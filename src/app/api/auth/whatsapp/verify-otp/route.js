import { getDb } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { phone, code } = await request.json();

    if (!phone || !code) {
      return NextResponse.json({ error: "Phone and code are required." }, { status: 400 });
    }

    const db = await getDb();
    
    // Find the OTP code in the database
    const otpRecord = await db.collection('otp_codes').findOne({ phone });

    if (!otpRecord) {
      return NextResponse.json({ error: "No OTP request found for this number." }, { status: 404 });
    }

    // Check expiration
    if (new Date() > new Date(otpRecord.expiresAt)) {
      await db.collection('otp_codes').deleteOne({ phone });
      return NextResponse.json({ error: "OTP has expired. Please request a new one." }, { status: 400 });
    }

    // Verify code
    if (otpRecord.code !== code) {
      return NextResponse.json({ error: "Invalid OTP code." }, { status: 400 });
    }

    // Validation successful, delete the OTP to prevent reuse
    await db.collection('otp_codes').deleteOne({ phone });

    return NextResponse.json({ success: true, message: "WhatsApp OTP verified successfully." });

  } catch (error) {
    console.error("WhatsApp Verify OTP Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
