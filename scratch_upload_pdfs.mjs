import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const mongoUri = "mongodb://universalinteriorr_db_user:l5rH39d3Fkl7xMdE@ac-enfi86n-shard-00-00.rnyjmow.mongodb.net:27017,ac-enfi86n-shard-00-01.rnyjmow.mongodb.net:27017,ac-enfi86n-shard-00-02.rnyjmow.mongodb.net:27017/universal-cms-dev?ssl=true&authSource=admin&replicaSet=atlas-jv7b0z-shard-0";
const dir = 'D:\\AVLANCE\\PDFS';

async function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

async function uploadPdfs() {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    const db = client.db();
    const catalogsCollection = db.collection('catalogs');

    // Clear old mock data
    await catalogsCollection.deleteMany({});
    
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.pdf'));
    
    for (const file of files) {
      console.log(`\nUploading ${file}... This may take a while for large files.`);
      const filePath = path.join(dir, file);
      
      try {
        // We upload it as 'image' so cloudinary supports multi-page rasterization
        // upload_large supports chunked uploading for large files
        const res = await cloudinary.uploader.upload_large(filePath, { 
          resource_type: 'image', 
          folder: 'catalogs_pdf',
          chunk_size: 6000000 // 6MB chunks
        });

        console.log(`Successfully uploaded ${file}!`);
        console.log(`Cloudinary public_id: ${res.public_id}`);
        console.log(`Total Pages: ${res.pages}`);

        // Generate the URL array for the flipbook
        // format: https://res.cloudinary.com/<cloud_name>/image/upload/pg_<page_num>/v<version>/<public_id>.webp
        const totalPages = res.pages || 1;
        const pagesArray = [];
        
        for (let i = 1; i <= totalPages; i++) {
          pagesArray.push(`https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/pg_${i}/f_webp,q_auto,w_1200/v${res.version}/${res.public_id}.webp`);
        }

        const title = file.replace('.pdf', '');
        const slug = await slugify(title);

        await catalogsCollection.insertOne({
          slug,
          title,
          description: `Exclusive design catalog: ${title}`,
          coverImage: pagesArray[0],
          totalPages,
          pages: pagesArray,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        
        console.log(`Saved ${title} to MongoDB!`);
      } catch (uploadErr) {
        console.error(`Failed to upload ${file}:`, uploadErr);
      }
    }
  } finally {
    await client.close();
    console.log("Done.");
  }
}

uploadPdfs().catch(console.error);
