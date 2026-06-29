import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { verifyAuth } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function GET(request) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = await getDb();
    
    // Fetch from all 3 collections
    const [quotes, bookConsultations, liveConsultations] = await Promise.all([
      db.collection('quote_estimation').find().toArray(),
      db.collection('book_consultations').find().toArray(),
      db.collection('live_consultations').find().toArray()
    ]);

    // Map and normalize the data
    const allLeads = [
      ...quotes.map(q => ({ ...q, _id: q._id.toString(), source: 'quote_estimation', status: q.status || 'New' })),
      ...bookConsultations.map(b => ({ ...b, _id: b._id.toString(), source: 'book_consultations', status: b.status || 'New' })),
      ...liveConsultations.map(l => ({ ...l, _id: l._id.toString(), source: 'live_consultations', status: l.status || 'New' }))
    ];

    // Sort by createdAt descending
    allLeads.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

    return NextResponse.json({ leads: allLeads });
  } catch (err) {
    console.error('Error fetching leads:', err);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function PATCH(request) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, source, status } = await request.json();
    if (!id || !source || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = await getDb();
    
    let queryId = id;
    if (ObjectId.isValid(id) && source !== 'quote_estimation') {
      queryId = new ObjectId(id);
    }

    await db.collection(source).updateOne(
      { _id: queryId },
      { $set: { status } }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error updating lead status:', err);
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const source = url.searchParams.get('source');

    if (!id || !source) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = await getDb();
    
    let queryId = id;
    if (ObjectId.isValid(id) && source !== 'quote_estimation') {
      queryId = new ObjectId(id);
    }

    await db.collection(source).deleteOne({ _id: queryId });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error deleting lead:', err);
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
  }
}
