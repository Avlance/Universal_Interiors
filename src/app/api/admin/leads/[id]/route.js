import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { verifyAuth } from '@/lib/auth';
import { ObjectId } from 'mongodb';

// Helper to get the correct query ID based on source
function getQueryId(id, source) {
  if (ObjectId.isValid(id) && source !== 'quote_estimation') {
    return new ObjectId(id);
  }
  return id;
}

export async function GET(request, { params }) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const paramsAwaited = await params;
    const id = paramsAwaited.id;
    const url = new URL(request.url);
    const source = url.searchParams.get('source');

    if (!id || !source) {
      return NextResponse.json({ error: 'Missing id or source' }, { status: 400 });
    }

    const db = await getDb();
    const queryId = getQueryId(id, source);

    const lead = await db.collection(source).findOne({ _id: queryId });

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    // Add source for the UI to display
    lead.source = source;

    return NextResponse.json({ lead });
  } catch (err) {
    console.error('Error fetching lead details:', err);
    return NextResponse.json({ error: 'Failed to fetch lead details' }, { status: 500 });
  }
}

// Used to add a note, document, or site photo
export async function POST(request, { params }) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const paramsAwaited = await params;
    const id = paramsAwaited.id;
    const url = new URL(request.url);
    const source = url.searchParams.get('source');
    const action = url.searchParams.get('action'); // 'note', 'document', 'sitePhoto'

    if (!id || !source || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const body = await request.json();
    const db = await getDb();
    const queryId = getQueryId(id, source);

    // Generate a unique ID for the new item
    const newItem = {
      ...body,
      id: new ObjectId().toString(),
      createdAt: new Date().toISOString()
    };

    let updateQuery = {};
    if (action === 'note') {
      updateQuery = { $push: { notes: newItem } };
    } else if (action === 'document') {
      updateQuery = { $push: { documents: newItem } };
    } else if (action === 'sitePhoto') {
      updateQuery = { $push: { sitePhotos: newItem } };
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    await db.collection(source).updateOne({ _id: queryId }, updateQuery);

    return NextResponse.json({ success: true, item: newItem });
  } catch (err) {
    console.error('Error adding item to lead:', err);
    return NextResponse.json({ error: 'Failed to add item' }, { status: 500 });
  }
}

// Used to delete a note, document, or site photo
export async function DELETE(request, { params }) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const paramsAwaited = await params;
    const id = paramsAwaited.id;
    const url = new URL(request.url);
    const source = url.searchParams.get('source');
    const action = url.searchParams.get('action'); // 'note', 'document', 'sitePhoto'
    const itemId = url.searchParams.get('itemId');

    if (!id || !source || !action || !itemId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = await getDb();
    const queryId = getQueryId(id, source);

    let updateQuery = {};
    if (action === 'note') {
      updateQuery = { $pull: { notes: { id: itemId } } };
    } else if (action === 'document') {
      updateQuery = { $pull: { documents: { id: itemId } } };
    } else if (action === 'sitePhoto') {
      updateQuery = { $pull: { sitePhotos: { id: itemId } } };
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    await db.collection(source).updateOne({ _id: queryId }, updateQuery);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error deleting item from lead:', err);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
