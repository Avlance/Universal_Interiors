import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'sevfdaro',
  api_key: '843732665329427',
  api_secret: 'qQMlpnr1SPxnVxpMBvcJ-SlMPos',
});

const AZURE_BASE = 'https://universalcmsdev.blob.core.windows.net/universal-website-container/';
const SRC_DIR = path.resolve(process.cwd(), 'src');

async function getFiles(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  }));
  return Array.prototype.concat(...files);
}

async function run() {
  console.log("Starting Azure to Cloudinary Migration...");
  const files = await getFiles(SRC_DIR);
  const jsFiles = files.filter(f => f.endsWith('.js') || f.endsWith('.jsx'));

  const urlMap = new Map(); // Azure URL -> Cloudinary URL

  for (const file of jsFiles) {
    const content = await fs.readFile(file, 'utf-8');
    const regex = /https:\/\/universalcmsdev\.blob\.core\.windows\.net\/universal-website-container\/[a-zA-Z0-9\-\/._]+/g;
    
    let match;
    while ((match = regex.exec(content)) !== null) {
      const url = match[0];
      if (!urlMap.has(url)) {
        urlMap.set(url, null); // Will populate later
      }
    }
  }

  const uniqueUrls = Array.from(urlMap.keys());
  console.log(`Found ${uniqueUrls.length} unique Azure URLs.`);

  if (uniqueUrls.length === 0) {
    console.log("No Azure URLs found. Exiting.");
    return;
  }

  // Download and Upload
  for (let i = 0; i < uniqueUrls.length; i++) {
    const azureUrl = uniqueUrls[i];
    console.log(`[${i+1}/${uniqueUrls.length}] Processing ${azureUrl}`);
    
    try {
      const response = await axios.get(azureUrl, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'binary');

      const relativePath = azureUrl.replace(AZURE_BASE, '');
      // E.g. guides/kitchen-guide/l-shaped.webp
      
      const publicId = `azure_migrated/${relativePath.replace(/\.[^/.]+$/, '')}`;
      // E.g. azure_migrated/guides/kitchen-guide/l-shaped

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            public_id: publicId,
            resource_type: 'auto',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      console.log(` -> Uploaded to: ${uploadResult.secure_url}`);
      urlMap.set(azureUrl, uploadResult.secure_url);

    } catch (err) {
      console.error(`Failed to process ${azureUrl}:`, err.message);
    }
  }

  // Find and replace in files
  let replacedFilesCount = 0;
  for (const file of jsFiles) {
    let content = await fs.readFile(file, 'utf-8');
    let modified = false;

    for (const [azureUrl, cloudinaryUrl] of urlMap.entries()) {
      if (cloudinaryUrl && content.includes(azureUrl)) {
        // Replace all occurrences in the file
        content = content.split(azureUrl).join(cloudinaryUrl);
        modified = true;
      }
    }

    if (modified) {
      await fs.writeFile(file, content, 'utf-8');
      console.log(`Updated URLs in: ${path.relative(process.cwd(), file)}`);
      replacedFilesCount++;
    }
  }

  console.log(`Migration complete! Replaced URLs in ${replacedFilesCount} files.`);
}

run().catch(console.error);
