import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');
const dir = 'D:\\AVLANCE\\PDFS';

async function checkPdfs() {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.pdf'));
  for (const file of files) {
    const filePath = path.join(dir, file);
    const dataBuffer = fs.readFileSync(filePath);
    try {
      const data = await pdfParse(dataBuffer);
      console.log(`[${file}] -> ${data.numpages} pages`);
    } catch (err) {
      console.log(`[${file}] -> Error parsing: ${err.message}`);
    }
  }
}

checkPdfs();
