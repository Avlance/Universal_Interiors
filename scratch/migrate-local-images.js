const fs = require('fs');
const path = require('path');
const dns = require('dns');
const { MongoClient } = require('mongodb');
const { v2: cloudinary } = require('cloudinary');

dns.setServers(['8.8.8.8', '1.1.1.1']);

// 1. Parse .env
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

const newUri = process.env.MONGODB_URI;
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!newUri || newUri.includes('<db_password>')) {
  console.error('[Error] MONGODB_URI is not configured properly in .env');
  process.exit(1);
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret
});

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
const SUPPORTED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif'];

// Recursively find all files in a directory
function getFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, files);
    } else {
      const ext = path.extname(fullPath).toLowerCase();
      if (SUPPORTED_EXTENSIONS.includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

// Helper: Recursively search and replace strings in files in a directory
function replaceInFiles(dir, findStr, replaceStr) {
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (item === 'node_modules' || item === '.next' || item === '.git') continue;
      replaceInFiles(fullPath, findStr, replaceStr);
    } else {
      const ext = path.extname(fullPath).toLowerCase();
      if (['.js', '.jsx', '.ts', '.tsx', '.css', '.html'].includes(ext)) {
        let content = fs.readFileSync(fullPath, 'utf-8');
        if (content.includes(findStr)) {
          console.log(`  -> Replacing in file: ${path.relative(process.cwd(), fullPath)}`);
          // Handle both exact and potentially slightly different path forms
          const regex = new RegExp(findStr.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
          content = content.replace(regex, replaceStr);
          fs.writeFileSync(fullPath, content, 'utf-8');
        }
      }
    }
  }
}

async function run() {
  let client;
  try {
    console.log('Connecting to new MongoDB database...');
    client = await MongoClient.connect(newUri);
    const db = client.db(process.env.MONGODB_DB || 'universal-cms-dev');
    const mappingCollection = db.collection('local_assets_mapping');

    console.log(`Scanning local images directory: ${IMAGES_DIR}`);
    const localFiles = getFiles(IMAGES_DIR);
    console.log(`Found ${localFiles.length} local images.`);

    if (localFiles.length === 0) {
      console.log('No local images found to migrate.');
      await client.close();
      return;
    }

    const mappings = [];

    for (const file of localFiles) {
      // Calculate relative path from public directory (e.g. /images/home/hero.png)
      const relativePath = '/' + path.relative(path.join(process.cwd(), 'public'), file).replace(/\\/g, '/');
      const folderName = path.dirname(path.relative(IMAGES_DIR, file)).replace(/\\/g, '/');
      const cleanFolder = folderName === '.' ? 'root' : folderName;
      
      const fileBuffer = fs.readFileSync(file);
      const urlFilename = path.basename(file, path.extname(file));

      console.log(`\nUploading ${relativePath} to Cloudinary...`);
      
      try {
        const uploadResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: `local_assets_migrated/${cleanFolder}`,
              public_id: urlFilename,
              resource_type: 'auto'
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(fileBuffer);
        });

        console.log(`Uploaded! URL: ${uploadResult.secure_url}`);
        mappings.push({
          localPath: relativePath,
          cloudinaryUrl: uploadResult.secure_url,
          cloudinaryId: uploadResult.public_id,
          migratedAt: new Date()
        });

      } catch (err) {
        console.error(`Failed to upload ${relativePath}:`, err.message);
      }
    }

    // Save mappings to MongoDB
    if (mappings.length > 0) {
      console.log('\nSaving mappings to MongoDB...');
      await mappingCollection.deleteMany({}); // clear existing
      await mappingCollection.insertMany(mappings);
      console.log(`Saved ${mappings.length} mappings to database.`);

      // Perform find-and-replace in the src directory
      console.log('\nReplacing local image paths in codebase with Cloudinary URLs...');
      const srcDir = path.join(process.cwd(), 'src');
      for (const map of mappings) {
        console.log(`Replacing '${map.localPath}'...`);
        // Replace absolute form (/images/...)
        replaceInFiles(srcDir, map.localPath, map.cloudinaryUrl);
        // Replace relative form (images/...) if it exists
        const relativeForm = map.localPath.startsWith('/') ? map.localPath.substring(1) : map.localPath;
        replaceInFiles(srcDir, relativeForm, map.cloudinaryUrl);
      }

      // Delete local files
      console.log('\nDeleting local image files...');
      for (const file of localFiles) {
        try {
          fs.unlinkSync(file);
          console.log(`Deleted local file: ${path.relative(process.cwd(), file)}`);
        } catch (e) {
          console.error(`Failed to delete ${file}:`, e.message);
        }
      }
      
      // Clean up empty directories recursively under public/images
      const cleanEmptyDirs = (dir) => {
        if (!fs.existsSync(dir)) return;
        const files = fs.readdirSync(dir);
        if (files.length > 0) {
          files.forEach(f => {
            const fp = path.join(dir, f);
            if (fs.statSync(fp).isDirectory()) cleanEmptyDirs(fp);
          });
        }
        // check again after cleaning subdirs
        if (fs.readdirSync(dir).length === 0 && dir !== IMAGES_DIR) {
          fs.rmdirSync(dir);
          console.log(`Removed empty folder: ${path.relative(process.cwd(), dir)}`);
        }
      };
      cleanEmptyDirs(IMAGES_DIR);
    }

    console.log('\nMigration and replacement complete!');

  } catch (err) {
    console.error('Migration error:', err);
  } finally {
    if (client) await client.close();
  }
}

run();
