import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pdfPath = 'C:\\Users\\노\\.gemini\\antigravity\\brain\\e0ef33d1-548a-41a2-8f11-30a25464940c\\.user_uploaded\\media_1787055647348.pdf';
const dbPath = path.join(__dirname, '../src/data/hanjaMeta.js');

async function extractTextFromPDF(pdfPath) {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({
    data,
    standardFontDataUrl: path.join(__dirname, '../node_modules/pdfjs-dist/standard_fonts/') + '/'
  }).promise;
  let fullText = '';
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    let lastY = -1;
    let text = '';
    for (const item of content.items) {
      if (lastY !== item.transform[5]) {
        text += '\n';
        lastY = item.transform[5];
      }
      text += item.str + ' ';
    }
    fullText += text + '\n';
  }
  return fullText;
}

async function main() {
  const text = await extractTextFromPDF(pdfPath);
  const lines = text.split('\n');

  // Map of grade -> array of entries
  const pdfGradeCounts = {};
  const pdfEntries = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    const parts = trimmed.split(/\s+/);
    if (parts.length >= 7) {
      const eumPart = parts[0];
      const grade = parts[1];
      const character = parts[2];
      
      if (grade.includes('급') || grade.includes('특급')) {
        const totalStrokes = parseInt(parts[parts.length - 1], 10) || 0;
        const stroke = parseInt(parts[parts.length - 2], 10) || 0;
        const radical = parts[parts.length - 3];
        const hunEum = parts.slice(3, parts.length - 3).join(' ');
        const words = hunEum.split(' ');
        const eum = words[words.length - 1];
        const hun = words.slice(0, words.length - 1).join(' ');

        if (character && character.length === 1) {
          pdfGradeCounts[grade] = (pdfGradeCounts[grade] || 0) + 1;
          pdfEntries.push({
            eumPart,
            grade,
            character,
            hunEum,
            hun,
            eum,
            radical,
            stroke,
            totalStrokes
          });
        }
      }
    }
  }

  console.log('PDF extracted grade counts:');
  console.log(pdfGradeCounts);

  const content = fs.readFileSync(dbPath, 'utf8');
  const match = content.match(/export const hanjaMeta = (\[[\s\S]*\]);/);
  const hanjaMeta = JSON.parse(match[1]);

  console.log(`DB total: ${hanjaMeta.length}`);

  // Check 8급 in DB vs PDF
  const db8 = hanjaMeta.filter(h => h.uhmoon === '8급');
  const pdf8 = pdfEntries.filter(p => p.grade === '8급');
  console.log(`PDF 8급 count: ${pdf8.length}, DB 8급 count: ${db8.length}`);
  
  // Check duplicates in 8급 PDF
  const pdf8Chars = pdf8.map(p => p.character);
  const dup8 = pdf8Chars.filter((c, i) => pdf8Chars.indexOf(c) !== i);
  console.log(`PDF 8급 duplicate characters:`, dup8);

  // Check duplicates in DB
  const dbChars = hanjaMeta.map(h => h.character);
  const dupDB = dbChars.filter((c, i) => dbChars.indexOf(c) !== i);
  console.log(`DB duplicate characters (${dupDB.length}):`, [...new Set(dupDB)].slice(0, 10));

  // Check how many PDF entries are not in DB
  const dbCharSet = new Set(hanjaMeta.map(h => h.character.normalize('NFKC')));
  const missingFromDB = pdfEntries.filter(p => !dbCharSet.has(p.character.normalize('NFKC')));
  console.log(`Total PDF entries missing from DB: ${missingFromDB.length}`);
  
  const missingByGrade = {};
  for (const m of missingFromDB) {
    missingByGrade[m.grade] = (missingByGrade[m.grade] || 0) + 1;
  }
  console.log('Missing from DB by grade:', missingByGrade);
}

main().catch(console.error);
