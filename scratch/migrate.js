const fs = require('fs');
const path = require('path');
const dns = require('dns');
const { MongoClient, Binary } = require('mongodb');
const { v2: cloudinary } = require('cloudinary');

// Override DNS servers to prevent querySrv ECONNREFUSED in Node
dns.setServers(['8.8.8.8', '1.1.1.1']);


// 1. Manually parse .env file
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
    console.log('Loaded credentials from .env successfully.');
  }
} catch (e) {
  console.warn('Could not read .env file:', e.message);
}

// 2. Validate environment
const oldUri = process.env.OLD_MONGODB_URI;
const newUri = process.env.MONGODB_URI;
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!oldUri || !newUri || newUri.includes('<db_password>')) {
  console.error('\n[Error] Missing connection URIs! Please make sure MONGODB_URI (with your actual password) and OLD_MONGODB_URI are set in your .env file.\n');
  process.exit(1);
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret
});

// Helper: Identify if value is a base64 image string
function isBase64Image(val) {
  if (typeof val !== 'string') return false;
  return /^data:image\/[a-z]+;base64,/.test(val) || (val.length > 1000 && /^[A-Za-z0-9+/=]+$/.test(val.replace(/\s/g, '')));
}

// Helper: Check if an object is a plain JS object (excluding BSON types like ObjectId)
function isPlainObject(val) {
  if (val === null || typeof val !== 'object') return false;
  const proto = Object.getPrototypeOf(val);
  return proto === null || proto === Object.prototype;
}

// Helper: Download image from a URL and return a Buffer
async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error ${response.status}`);
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

// Helper: Upload buffer to Cloudinary
async function uploadToCloudinary(buffer, collectionName, docId, fieldName) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: `migrated_from_db/${collectionName}`,
        public_id: `${docId}_${fieldName}`,
        resource_type: 'image'
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
}

// Helper: Recursively search and replace image data in document
async function processDocumentImages(doc, collectionName) {
  const docId = doc._id ? doc._id.toString() : 'unknown';
  
  for (const key of Object.keys(doc)) {
    if (key === '_id') continue; // Skip MongoDB internal ID
    
    const val = doc[key];
    
    // Check for Binary buffer (MongoDB Binary type)
    if (val instanceof Binary || (val && val._bsontype === 'Binary') || Buffer.isBuffer(val)) {
      console.log(`  -> Found binary data in field '${key}'. Uploading to Cloudinary...`);
      try {
        const buffer = Buffer.isBuffer(val) ? val : (val.buffer || Buffer.from(val.sub_type ? val.value(true) : val));
        const url = await uploadToCloudinary(buffer, collectionName, docId, key);
        doc[key] = url;
        console.log(`     Uploaded! URL: ${url}`);
      } catch (err) {
        console.error(`     Failed to upload binary field '${key}':`, err.message);
      }
    } 
    // Check for base64 image strings
    else if (isBase64Image(val)) {
      console.log(`  -> Found base64 string in field '${key}'. Uploading to Cloudinary...`);
      try {
        const base64Data = val.includes('base64,') ? val.split('base64,')[1] : val;
        const buffer = Buffer.from(base64Data, 'base64');
        const url = await uploadToCloudinary(buffer, collectionName, docId, key);
        doc[key] = url;
        console.log(`     Uploaded! URL: ${url}`);
      } catch (err) {
        console.error(`     Failed to upload base64 field '${key}':`, err.message);
      }
    }
    // Check if the value is an Azure Blob Storage URL to migrate
    else if (typeof val === 'string' && val.startsWith('https://universalcmsdev.blob.core.windows.net/')) {
      console.log(`  -> Found Azure image URL in field '${key}': ${val.substring(0, 60)}...`);
      console.log(`     Downloading and migrating to Cloudinary...`);
      try {
        const buffer = await downloadImage(val);
        // Extract clean field suffix from URL filename if needed
        const urlFilename = path.basename(val, path.extname(val));
        const cloudinaryUrl = await uploadToCloudinary(buffer, collectionName, docId, `${key}_${urlFilename}`);
        doc[key] = cloudinaryUrl;
        console.log(`     Migrated! New Cloudinary URL: ${cloudinaryUrl}`);
      } catch (err) {
        console.error(`     Failed to migrate Azure image:`, err.message);
      }
    }
    // Recursively process nested plain objects
    else if (isPlainObject(val)) {
      await processDocumentImages(val, collectionName);
    }
    // Recursively process arrays
    else if (Array.isArray(val)) {
      for (let i = 0; i < val.length; i++) {
        if (val[i] && (typeof val[i] === 'object' || typeof val[i] === 'string')) {
          // If the array contains a string that is an Azure URL, we migrate it
          if (typeof val[i] === 'string' && val[i].startsWith('https://universalcmsdev.blob.core.windows.net/')) {
            console.log(`  -> Found Azure URL in array '${key}'[${i}]. Migrating...`);
            try {
              const buffer = await downloadImage(val[i]);
              const urlFilename = path.basename(val[i], path.extname(val[i]));
              const cloudinaryUrl = await uploadToCloudinary(buffer, collectionName, docId, `${key}_arr_${i}_${urlFilename}`);
              val[i] = cloudinaryUrl;
              console.log(`     Migrated! New URL: ${cloudinaryUrl}`);
            } catch (err) {
              console.error(`     Failed to migrate URL:`, err.message);
            }
          } else if (isPlainObject(val[i])) {
            await processDocumentImages(val[i], collectionName);
          }
        }
      }
    }
  }
  return doc;
}

async function runMigration() {
  let oldClient, newClient;
  
  try {
    console.log('\nConnecting to Old Database...');
    oldClient = await MongoClient.connect(oldUri);
    const oldDb = oldClient.db();
    console.log(`Connected to Old DB: "${oldDb.databaseName}"`);

    console.log('\nConnecting to New Database...');
    newClient = await MongoClient.connect(newUri);
    const newDb = newClient.db(process.env.MONGODB_DB || 'universal-cms-dev');
    console.log(`Connected to New DB: "${newDb.databaseName}"`);

    // List all collections in old DB
    const collections = await oldDb.listCollections().toArray();
    console.log(`\nFound ${collections.length} collections in old database.`);

    for (const colInfo of collections) {
      const colName = colInfo.name;
      if (colName.startsWith('system.')) continue; // skip system collections

      console.log(`\n--------------------------------------------`);
      console.log(`Migrating Collection: "${colName}"`);
      console.log(`--------------------------------------------`);

      const oldCollection = oldDb.collection(colName);
      const newCollection = newDb.collection(colName);

      // Clear existing data in new collection to avoid duplicate keys on rerun
      await newCollection.deleteMany({});

      const cursor = oldCollection.find({});
      const docs = await cursor.toArray();
      console.log(`Found ${docs.length} documents.`);

      if (docs.length === 0) continue;

      const migratedDocs = [];
      for (const doc of docs) {
        console.log(`Processing Document ID: ${doc._id}`);
        const cleanedDoc = await processDocumentImages(doc, colName);
        migratedDocs.push(cleanedDoc);
      }

      // Write to new DB
      console.log(`Writing ${migratedDocs.length} documents into new collection...`);
      const result = await newCollection.insertMany(migratedDocs);
      console.log(`Successfully migrated ${result.insertedCount} documents!`);
    }

    console.log('\n============================================');
    console.log('Migration Completed Successfully!');
    console.log('============================================\n');

  } catch (err) {
    console.error('\nMigration Failed with Error:', err);
  } finally {
    if (oldClient) await oldClient.close();
    if (newClient) await newClient.close();
  }
}

runMigration();
