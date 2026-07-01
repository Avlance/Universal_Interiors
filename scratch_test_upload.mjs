import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function testUpload() {
  const file = 'D:\\AVLANCE\\PDFS\\collective-0.8mm.pdf';
  console.log("Uploading test...");
  try {
    const res = await cloudinary.uploader.upload(file, { resource_type: 'image' });
    console.log("Res keys:", Object.keys(res));
    console.log("public_id:", res.public_id);
    console.log("pages:", res.pages);
  } catch (err) {
    console.error("Error:", err);
  }
}
testUpload();
