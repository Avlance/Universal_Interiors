import { NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// Initialize Admin SDK only if not already initialized
try {
  if (!getApps().length) {
    const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n');
    if (privateKey && privateKey.includes('BEGIN PRIVATE KEY')) {
      initializeApp({
        credential: cert({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
          privateKey,
        }),
      });
    } else {
      console.warn("Invalid or missing FIREBASE_ADMIN_PRIVATE_KEY. Skipping Firebase Admin initialization.");
    }
  }
} catch (error) {
  console.error("Firebase admin init error:", error);
}

export async function POST(req) {
  try {
    const { idToken } = await req.json();

    if (!getApps().length) {
      return NextResponse.json({ error: 'Firebase Admin not configured' }, { status: 500 });
    }

    // This verifies the SMS login was successful and authentic
    const decodedToken = await getAuth().verifyIdToken(idToken);
    
    return NextResponse.json({ 
      success: true, 
      uid: decodedToken.uid,
      phone: decodedToken.phone_number
    });

  } catch (error) {
    console.error('Error verifying Firebase ID token:', error);
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
}
