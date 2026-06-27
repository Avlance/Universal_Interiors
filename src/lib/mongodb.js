import { MongoClient } from 'mongodb';
import { MockDb } from './mock-db.js';

const uri = process.env.MONGODB_URI;

// ─── Mock mode (no real MongoDB needed) ───────────────────────────────────────
// Activated when MONGODB_URI=mock in .env
// All routes continue to function using an in-memory store.
const IS_MOCK = !uri || uri === 'mock';

if (!IS_MOCK && !uri) {
  throw new Error('Please add your Mongo URI to your environment variables or .env file');
}

let clientPromise;

if (!IS_MOCK) {
  const options = {};
  let client;

  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the connection pool
    // is preserved across module reloads caused by Hot Module Replacement (HMR).
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    // In production, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

// Helper to quickly grab the database object
export async function getDb() {
  if (IS_MOCK) {
    if (!global._mockDb) {
      global._mockDb = new MockDb();
      console.log('\n[MockDB] 🗄️  Using in-memory mock database (MONGODB_URI=mock)\n');
    }
    return global._mockDb;
  }
  const conn = await clientPromise;
  return conn.db(process.env.MONGODB_DB || 'universal-cms-dev');
}

export default IS_MOCK ? null : clientPromise;
