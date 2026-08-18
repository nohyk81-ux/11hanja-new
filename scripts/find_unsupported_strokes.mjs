import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '../src/data/hanjaMeta.js');
const localStrokesPath = path.join(__dirname, '../public/data/strokes-hw');
const hanziPath = path.join(__dirname, '../node_modules/hanzi-writer-data');
const jpPath = path.join(__dirname, '../node_modules/@k1low/hanzi-writer-data-jp');

const content = fs.readFileSync(dbPath, 'utf8');
const match = content.match(/export const hanjaMeta = (\[[\s\S]*\]);/);
const hanjaMeta = JSON.parse(match[1]);

// Filter uhmoon characters
const uhmoonList = hanjaMeta.filter(h => h.uhmoon);
console.log(`Total Uhmoon characters in DB: ${uhmoonList.length}`);

function hasStrokeData(rawChar) {
  if (!rawChar) return false;
  const normChar = rawChar.normalize('NFKC');
  
  const charsToCheck = [rawChar, normChar];

  for (const c of charsToCheck) {
    // 1. Check local override
    if (fs.existsSync(path.join(localStrokesPath, `${c}.json`))) return true;
    // 2. Check hanzi-writer-data
    if (fs.existsSync(path.join(hanziPath, `${c}.json`))) return true;
    // 3. Check jp
    if (fs.existsSync(path.join(jpPath, `${c}.json`))) return true;
  }
  return false;
}

const unsupportedByGrade = {};
const unsupportedAll = [];

for (const h of uhmoonList) {
  const supported = hasStrokeData(h.character);
  if (!supported) {
    if (!unsupportedByGrade[h.uhmoon]) {
      unsupportedByGrade[h.uhmoon] = [];
    }
    unsupportedByGrade[h.uhmoon].push({
      character: h.character,
      hunEum: h.hunEum,
      grade: h.uhmoon
    });
    unsupportedAll.push(h);
  }
}

console.log(`Total unsupported characters in Uhmoon: ${unsupportedAll.length}`);
console.log('\n--- Unsupported by Grade ---');
const gradeOrder = ['8급', '7급Ⅱ', '7급', '6급Ⅱ', '6급', '5급Ⅱ', '5급', '4급Ⅱ', '4급', '3급Ⅱ', '3급', '2급', '1급Ⅱ', '1급', '특급Ⅱ', '특급'];

for (const grade of gradeOrder) {
  const list = unsupportedByGrade[grade] || [];
  console.log(`\n[${grade}] (${list.length}자):`);
  if (list.length > 0) {
    console.log(list.map(i => `${i.character}(${i.hunEum || ''})`).join(', '));
  } else {
    console.log('없음 (모두 정상 작동)');
  }
}

// Save detailed report as JSON
fs.writeFileSync(
  path.join(__dirname, 'unsupported_strokes_report.json'),
  JSON.stringify({
    totalUhmoon: uhmoonList.length,
    totalUnsupported: unsupportedAll.length,
    unsupportedByGrade
  }, null, 2),
  'utf8'
);
