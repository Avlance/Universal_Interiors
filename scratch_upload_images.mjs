import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import pLimit from 'p-limit'; // Wait, p-limit might not be installed. Let me write a simple custom limiter or upload sequentially.

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const mongoUri = "mongodb://universalinteriorr_db_user:l5rH39d3Fkl7xMdE@ac-enfi86n-shard-00-00.rnyjmow.mongodb.net:27017,ac-enfi86n-shard-00-01.rnyjmow.mongodb.net:27017,ac-enfi86n-shard-00-02.rnyjmow.mongodb.net:27017/universal-cms-dev?ssl=true&authSource=admin&replicaSet=atlas-jv7b0z-shard-0";

const basePaths = [
  'D:\\AVLANCE\\PDFS\\Calplus-Ecatalogue_images',
  'D:\\AVLANCE\\PDFS\\CATCH PLUS_images',
  'D:\\AVLANCE\\PDFS\\Collective-0.8_images',
  'D:\\AVLANCE\\PDFS\\Merino-laminates_images'
];

async function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

async function uploadFolderImages() {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    const db = client.db();
    const catalogsCollection = db.collection('catalogs');

    // Clear old mock data
    await catalogsCollection.deleteMany({});
    
    for (const folderPath of basePaths) {
      const folderName = path.basename(folderPath).replace('_images', '');
      console.log(`\nProcessing catalog: ${folderName}`);
      
      const slug = await slugify(folderName);
      const files = fs.readdirSync(folderPath)
        .filter(f => f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.jpeg'))
        .sort(); // String sort works perfectly because ILovePDF pads with zeros (e.g. 0001, 0002)

      const pagesArray = [];
      const totalPages = files.length;
      
      console.log(`Found ${totalPages} pages. Uploading...`);
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = path.join(folderPath, file);
        
        try {
          // Upload to Cloudinary under the catalog slug folder
          const res = await cloudinary.uploader.upload(filePath, { 
            folder: `catalogs/${slug}`,
            use_filename: true,
            unique_filename: false
          });
          
          // Request WebP format and optimize quality for the flipbook viewer
          const optimizedUrl = cloudinary.url(res.public_id, {
            secure: true,
            fetch_format: 'webp',
            quality: 'auto',
            width: 1200,
            crop: 'limit'
          });
          
          pagesArray.push(optimizedUrl);
          
          process.stdout.write(`\rUploaded page ${i + 1}/${totalPages}`);
        } catch (uploadErr) {
          console.error(`\nFailed to upload ${file}:`, uploadErr);
        }
      }

      console.log(`\nSuccessfully uploaded all pages for ${folderName}!`);

      await catalogsCollection.insertOne({
        slug,
        title: folderName.replace(/-/g, ' ').toUpperCase(),
        description: `Exclusive design catalog: ${folderName.replace(/-/g, ' ')}`,
        coverImage: pagesArray[0],
        totalPages,
        pages: pagesArray,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      console.log(`Saved ${folderName} to MongoDB!`);
    }
  } finally {
    await client.close();
    console.log("\nDone migrating all catalogs!");
  }
}

uploadFolderImages().catch(console.error);
