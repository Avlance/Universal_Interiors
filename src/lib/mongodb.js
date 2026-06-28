import { MongoClient } from 'mongodb';
import { MockDb } from './mock-db.js';
import dns from 'dns';
import fs from 'fs';
import path from 'path';

// Override DNS resolution servers to prevent querySrv ECONNREFUSED on Windows machines
if (dns && typeof dns.setServers === 'function') {
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  } catch (e) {
    console.warn('Failed to set DNS servers in mongodb.js:', e.message);
  }
}

// Force override process.env.MONGODB_URI from the .env file directly to bypass stale shell environment variables
try {
  const envPath = path.resolve(process.cwd(), '.env');
  console.log('--- DB Config envPath:', envPath);
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf-8');
    console.log('--- .env content snippet:', envConfig.substring(0, 250).replace(/\r?\n/g, ' | '));
    envConfig.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const parts = trimmed.split('=');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const val = parts.slice(1).join('=').trim();
        if (key === 'MONGODB_URI') {
          process.env.MONGODB_URI = val;
        }
      }
    });
  } else {
    console.log('--- .env file NOT FOUND at:', envPath);
  }
} catch (e) {
  console.warn('Failed to manually parse .env:', e.message);
}

const uri = process.env.MONGODB_URI;
console.log('--- MONGODB_URI in Next.js:', uri ? uri.substring(0, 30) + '...' : 'undefined');

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
