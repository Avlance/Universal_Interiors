import { v2 as cloudinary } from 'cloudinary';
import { apiOk, apiBadRequest, apiError } from '@/lib/api-response';

// Configure Cloudinary SDK
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return apiBadRequest('No file provided for upload.');
    }

    // Convert Next.js Request File stream to Buffer for Cloudinary
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Perform Cloudinary upload stream
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'universal_interiors_uploads',
          resource_type: 'auto', // Auto-detect image/video/raw
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      stream.end(buffer);
    });

    // Return the secure URL and public ID
    return apiOk({
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    }, 'Image uploaded successfully to Cloudinary.');
  } catch (err) {
    console.error('Cloudinary upload error:', err);
    return apiError('Failed to upload image to Cloudinary.');
  }
}
