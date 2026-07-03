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
    const res = await cloudinary.search.expression('resource_type:image').sort_by('created_at', 'desc').max_results(20).execute();
    res.resources.forEach(r => console.log(r.public_id, r.secure_url));
  } catch(e) {
    console.log(e);
  }
}
check();
