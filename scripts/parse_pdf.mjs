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
  const doc = await pdfjsLib.getDocument({data, standardFontDataUrl: path.join(__dirname, '../node_modules/pdfjs-dist/standard_fonts/') + '/'}).promise;
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
  console.log('Reading PDF...');
  const text = await extractTextFromPDF(pdfPath);

  const lines = text.split('\n');
  const uhmoonMap = new Map();

  console.log('Parsing PDF lines...');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    const parts = trimmed.split(/\s+/);
    if (parts.length >= 7) {
      const grade = parts[1];
      const character = parts[2];
      
      // Basic validation
      if (grade.includes('급') || grade.includes('특급')) {
        const hunEum = parts.slice(3, parts.length - 3).join(' ');
        const words = hunEum.split(' ');
        const eum = words[words.length - 1];
        const hun = words.slice(0, words.length - 1).join(' ');

        const normChar = character.normalize('NFKC');
        if (character && character.length === 1) {
          const entry = {
            grade,
            hunEum,
            hun,
            eum
          };
          if (!uhmoonMap.has(character)) uhmoonMap.set(character, entry);
          if (!uhmoonMap.has(normChar)) uhmoonMap.set(normChar, entry);
        }
      }
    }
  }

  console.log(`Parsed ${uhmoonMap.size} characters from PDF.`);

  console.log('Reading hanjaMeta.js...');
  const content = fs.readFileSync(dbPath, 'utf8');
  
  const match = content.match(/export const GRADES = \[.*?\];\s*export const hanjaMeta = (\[[\s\S]*\]);/);
  if (!match) {
    console.error('Could not parse hanjaMeta.js');
    return;
  }
  
  const gradesText = content.match(/export const GRADES = \[.*?\];/)[0];
  const hanjaArrayStr = match[1];
  let hanjaMeta = [];
  try {
    hanjaMeta = JSON.parse(hanjaArrayStr);
  } catch (e) {
    console.error('Error parsing JSON from hanjaMeta:', e);
    return;
  }

  console.log(`Loaded ${hanjaMeta.length} characters from DB.`);

  let updatedUhmoonCount = 0;
  let updatedHunEumCount = 0;

  for (const item of hanjaMeta) {
    const char = item.character;
    const normChar = char ? char.normalize('NFKC') : '';
    const pdfData = uhmoonMap.get(char) || uhmoonMap.get(normChar);
    if (pdfData) {
      if (item.uhmoon !== pdfData.grade) {
        item.uhmoon = pdfData.grade;
        updatedUhmoonCount++;
      }
      
      if (!item.hunEum || item.hunEum.trim() === '') {
        item.hunEum = pdfData.hunEum;
        item.hun = pdfData.hun;
        item.eum = pdfData.eum;
        updatedHunEumCount++;
      }
    }
  }

  console.log(`Updated uhmoon grades for ${updatedUhmoonCount} characters.`);
  console.log(`Updated hunEum for ${updatedHunEumCount} characters.`);

  console.log('Writing back to hanjaMeta.js...');
  const newContent = `// 획순(strokes) 데이터가 제거된 경량화된 한자 메타데이터\n${gradesText}\n\nexport const hanjaMeta = ${JSON.stringify(hanjaMeta, null, 2)};\n`;
  fs.writeFileSync(dbPath, newContent, 'utf8');
  console.log('Done!');
}

main().catch(console.error);
