// fill_strokes.mjs
// PDF에서 모든 한자의 총획수(totalStrokes) 및 부수(radical)를 추출하여
// hanjaMeta.js의 비어있는 1,565자 총획수를 100% 채웁니다.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pdfPath = 'C:/Users/노/.gemini/antigravity/brain/47d75f71-ff09-462b-906e-990117dc88bf/.tempmediaStorage/media_1787056092880.pdf';
const dbPath = path.join(__dirname, '../src/data/hanjaMeta.js');

async function extractStrokesFromPDF(pdfPath) {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({
    data,
    useSystemFonts: true,
    isEvalSupported: false
  }).promise;

  console.log(`PDF loaded. Total pages: ${doc.numPages}`);
  const strokeMap = new Map();

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
    
    const lines = text.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      
      const parts = trimmed.split(/\s+/);
      if (parts.length >= 7) {
        const grade = parts[1];
        const character = parts[2];
        
        if ((grade.includes('급') || grade.includes('특급')) && character && character.length === 1) {
          const totalStrokes = parseInt(parts[parts.length - 1], 10) || 0;
          const stroke = parseInt(parts[parts.length - 2], 10) || 0;
          const radical = parts[parts.length - 3];

          if (totalStrokes > 0) {
            strokeMap.set(character, { totalStrokes, radical });
            strokeMap.set(character.normalize('NFKC'), { totalStrokes, radical });
          }
        }
      }
    }
  }

  return strokeMap;
}

async function main() {
  console.log('Extracting stroke data from PDF...');
  const strokeMap = await extractStrokesFromPDF(pdfPath);
  console.log(`Extracted stroke mappings for ${strokeMap.size} character variations.`);

  console.log('Reading hanjaMeta.js...');
  const content = fs.readFileSync(dbPath, 'utf8');
  const match = content.match(/export const hanjaMeta = (\[[\s\S]*\]);/);
  const hanjaMeta = JSON.parse(match[1]);

  let filled = 0;
  let stillMissing = [];

  for (const item of hanjaMeta) {
    if (!item.totalStrokes || typeof item.totalStrokes !== 'number' || item.totalStrokes === 0) {
      const char = item.character;
      const norm = char.normalize('NFKC');
      const data = strokeMap.get(char) || strokeMap.get(norm);

      if (data) {
        item.totalStrokes = data.totalStrokes;
        if (!item.radical || item.radical === '부수') {
          item.radical = data.radical;
        }
        filled++;
      } else {
        stillMissing.push(item);
      }
    }
  }

  console.log(`Filled totalStrokes: ${filled}`);
  console.log(`Still missing totalStrokes: ${stillMissing.length}`);

  if (stillMissing.length > 0) {
    console.log('Sample still missing:', stillMissing.slice(0, 10).map(h => ({ char: h.character, hunEum: h.hunEum })));
  }

  const newContent = content.replace(
    /export const hanjaMeta = \[[\s\S]*\];/,
    'export const hanjaMeta = ' + JSON.stringify(hanjaMeta, null, 2) + ';'
  );

  fs.writeFileSync(dbPath, newContent, 'utf8');
  console.log('Successfully updated hanjaMeta.js!');

  // Check 金 specifically
  const kim = hanjaMeta.find(h => h.id === 'sanggong-new-5');
  console.log('Verified 金:', JSON.stringify(kim));
}

main().catch(console.error);
