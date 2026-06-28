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
  const oldUri = process.env.OLD_MONGODB_URI;
  if (!oldUri) {
    console.error('Missing OLD_MONGODB_URI in .env');
    return;
  }

  const client = await MongoClient.connect(oldUri);
  const db = client.db();
  const collections = await db.listCollections().toArray();
  const azureUrls = new Set();

  function scanObj(obj) {
    if (!obj) return;
    if (typeof obj === 'string') {
      if (obj.startsWith('https://universalcmsdev.blob.core.windows.net/')) {
        azureUrls.add(obj);
      }
    } else if (Array.isArray(obj)) {
      obj.forEach(item => scanObj(item));
    } else if (typeof obj === 'object') {
      Object.keys(obj).forEach(key => {
        if (key !== '_id') scanObj(obj[key]);
      });
    }
  }

  console.log('Scanning old database for Azure URLs...');
  for (const colInfo of collections) {
    const colName = colInfo.name;
    if (colName.startsWith('system.')) continue;
    const docs = await db.collection(colName).find({}).toArray();
    docs.forEach(doc => scanObj(doc));
  }

  console.log(`\nFound ${azureUrls.size} unique Azure image URLs:\n`);
  const list = Array.from(azureUrls).sort();
  
  // Write to a markdown file
  let mdContent = '# Azure Stored Images\n\nHere is a list of all images currently stored in the old developer\'s Azure container:\n\n';
  list.forEach(url => {
    const filename = path.basename(url);
    mdContent += `- [${filename}](${url})\n`;
  });
  
  fs.writeFileSync('azure_images.md', mdContent);
  console.log('Saved image list to azure_images.md');
  
  await client.close();
}

run();
