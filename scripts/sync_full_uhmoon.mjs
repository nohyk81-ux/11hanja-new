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
  console.log('Extracting text from PDF...');
  const text = await extractTextFromPDF(pdfPath);
  const lines = text.split('\n');

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

  console.log(`Extracted ${pdfEntries.length} total entries from PDF.`);

  console.log('Reading hanjaMeta.js...');
  const content = fs.readFileSync(dbPath, 'utf8');
  const gradesText = content.match(/export const GRADES = \[.*?\];/)[0];
  const match = content.match(/export const hanjaMeta = (\[[\s\S]*\]);/);
  const hanjaMeta = JSON.parse(match[1]);

  console.log(`Current DB count: ${hanjaMeta.length}`);

  // Reset all existing uhmoon grades in DB first so we do a clean 1-to-1 sync
  for (const item of hanjaMeta) {
    item.uhmoon = null;
  }

  // Create lookup maps for DB items (exact character and normalized character)
  const exactMap = new Map();
  for (const item of hanjaMeta) {
    if (!exactMap.has(item.character)) {
      exactMap.set(item.character, item);
    }
  }

  const normMap = new Map();
  for (const item of hanjaMeta) {
    const norm = item.character.normalize('NFKC');
    if (!normMap.has(norm)) {
      normMap.set(norm, item);
    }
  }

  let matchedCount = 0;
  let addedCount = 0;
  let newIdCounter = 1;

  for (const p of pdfEntries) {
    const char = p.character;
    const norm = char.normalize('NFKC');

    // Find in DB
    let target = exactMap.get(char) || normMap.get(norm) || exactMap.get(norm) || normMap.get(char);
    
    // If target already has an uhmoon assigned from this run, we don't assign it again
    if (target && target.uhmoon === null) {
      target.uhmoon = p.grade;
      matchedCount++;
    } else {
      // Add as a new entry to hanjaMeta
      const newItem = {
        id: `uhmoon-${p.grade}-${newIdCounter++}`,
        character: char,
        hunEum: p.hunEum,
        hun: p.hun,
        eum: p.eum,
        radical: p.radical,
        totalStrokes: p.totalStrokes,
        daehan: null,
        korcham: null,
        uhmoon: p.grade
      };
      hanjaMeta.push(newItem);
      // update maps
      exactMap.set(char, newItem);
      normMap.set(norm, newItem);
      addedCount++;
    }
  }

  console.log(`Matched with existing DB items: ${matchedCount}`);
  console.log(`Added new items to DB: ${addedCount}`);
  console.log(`New DB total: ${hanjaMeta.length}`);

  // Check counts per grade in DB
  const finalCounts = {};
  for (const h of hanjaMeta) {
    if (h.uhmoon) {
      finalCounts[h.uhmoon] = (finalCounts[h.uhmoon] || 0) + 1;
    }
  }

  console.log('Final DB counts per grade:');
  console.log(finalCounts);

  // Write back to file
  console.log('Writing back to hanjaMeta.js...');
  const newContent = `// 획순(strokes) 데이터가 제거된 경량화된 한자 메타데이터\n${gradesText}\n\nexport const hanjaMeta = ${JSON.stringify(hanjaMeta, null, 2)};\n`;
  fs.writeFileSync(dbPath, newContent, 'utf8');
  console.log('Done!');
}

main().catch(console.error);
