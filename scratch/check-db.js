const fs = require('fs');
const path = require('path');
const dns = require('dns');
const { MongoClient } = require('mongodb');

dns.setServers(['8.8.8.8', '1.1.1.1']);

try {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf-8');
    envConfig.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const parts = trimmed.split('=');
      if (parts.length >= 2) {
        process.env[parts[0].trim()] = parts.slice(1).join('=').trim();
      }
    });
  }
} catch (e) {}

async function run() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db(process.env.MONGODB_DB || 'universal-cms-dev');
  console.log(`Connected to new DB: "${db.databaseName}"`);
  
  const docs = await db.collection('design_gallery_category').find({}).toArray();
  console.log('design_gallery_category documents:', JSON.stringify(docs, null, 2));
  
  await client.close();
}

run();
