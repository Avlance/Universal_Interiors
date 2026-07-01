import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function check() {
  try {
    const res = await cloudinary.search.expression('folder:catalogs_pdf').execute();
    console.log(res.resources);
  } catch(e) {
    console.log(e);
  }
}
check();
