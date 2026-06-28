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
  const client = await MongoClient.connect(process.env.OLD_MONGODB_URI);
  const db = client.db();
  const doc = await db.collection('design_gallery_category_items').findOne({});
  
  if (!doc) {
    console.log('No document found.');
    await client.close();
    return;
  }
  
  console.log('Doc fields:', Object.keys(doc));
  for (const key of Object.keys(doc)) {
    const val = doc[key];
    console.log(`- Field '${key}': type=${typeof val}, constructor=${val ? val.constructor.name : 'null'}`);
    if (key === 'previewImage') {
      console.log(`  Full URL of '${key}':`, val);
    }
  }
  
  if (Array.isArray(doc.childImages)) {
    console.log(`\nchildImages length: ${doc.childImages.length}`);
    if (typeof doc.childImages[0] === 'string') {
      console.log('childImages[0] snippet:', doc.childImages[0].substring(0, 100));
    }
  }
  
  await client.close();
}

run();
