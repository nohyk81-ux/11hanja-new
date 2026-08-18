const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');

const pdfPath = 'C:\\Users\\노\\.gemini\\antigravity\\brain\\e0ef33d1-548a-41a2-8f11-30a25464940c\\.user_uploaded\\media_1787055647348.pdf';
const dbPath = path.join(__dirname, '../src/data/hanjaMeta.js');

async function main() {
  console.log('Reading PDF...');
  const dataBuffer = fs.readFileSync(pdfPath);
  const data = await pdf(dataBuffer);
  const text = data.text;

  const lines = text.split('\n');
  const uhmoonMap = new Map();

  console.log('Parsing PDF lines...');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    // Example: 가 7급Ⅱ 家 집 가 宀 07 10
    const parts = trimmed.split(/\s+/);
    if (parts.length >= 7) {
      const eumPart = parts[0];
      const grade = parts[1];
      const character = parts[2];
      
      // Basic validation
      if (grade.includes('급') || grade.includes('특급')) {
        const totalStrokes = parts[parts.length - 1];
        const stroke = parts[parts.length - 2];
        const radical = parts[parts.length - 3];
        
        const hunEum = parts.slice(3, parts.length - 3).join(' ');
        
        const words = hunEum.split(' ');
        const eum = words[words.length - 1];
        const hun = words.slice(0, words.length - 1).join(' ');

        if (character && character.length === 1 && !uhmoonMap.has(character)) {
          uhmoonMap.set(character, {
            grade,
            hunEum,
            hun,
            eum
          });
        }
      }
    }
  }

  console.log(`Parsed ${uhmoonMap.size} characters from PDF.`);

  console.log('Reading hanjaMeta.js...');
  const content = fs.readFileSync(dbPath, 'utf8');
  
  // Extract GRADES export and hanjaMeta export
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
    if (uhmoonMap.has(char)) {
      const pdfData = uhmoonMap.get(char);
      
      // Update uhmoon grade
      if (item.uhmoon !== pdfData.grade) {
        item.uhmoon = pdfData.grade;
        updatedUhmoonCount++;
      }
      
      // Update hunEum if empty
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

  // Write back to file
  console.log('Writing back to hanjaMeta.js...');
  const newContent = `// 획순(strokes) 데이터가 제거된 경량화된 한자 메타데이터\n${gradesText}\n\nexport const hanjaMeta = ${JSON.stringify(hanjaMeta, null, 2)};\n`;
  fs.writeFileSync(dbPath, newContent, 'utf8');
  console.log('Done!');
}

main().catch(console.error);
