// fill_huneum.mjs - hanjaMeta.js에서 hun/eum이 비어있는 글자를 PDF에서 채웁니다.
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pdfPath = 'C:/Users/노/.gemini/antigravity/brain/47d75f71-ff09-462b-906e-990117dc88bf/.tempmediaStorage/media_1787056092880.pdf';

// ---- 1. hanjaMeta.js 로드 ----
const metaPath = join(__dirname, '../src/data/hanjaMeta.js');
const metaContent = readFileSync(metaPath, 'utf8');
const metaMatch = metaContent.match(/export const hanjaMeta = (\[[\s\S]*\]);/);
const hanjaMeta = JSON.parse(metaMatch[1]);

console.log('Total hanjaMeta entries:', hanjaMeta.length);
const missingBefore = hanjaMeta.filter(h => !h.hun || !h.eum).length;
console.log('Missing hun/eum before:', missingBefore);

// ---- 2. PDF에서 훈음 파싱 ----
async function extractFromPdf() {
  const data = new Uint8Array(readFileSync(pdfPath));
  const workerPath = new URL('../node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs', import.meta.url).href;
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerPath;
  const doc = await pdfjsLib.getDocument({ data, useSystemFonts: true, isEvalSupported: false }).promise;
  const numPages = doc.numPages;
  console.log('PDF pages:', numPages);

  const hunEumMap = {};

  for (let p = 1; p <= numPages; p++) {
    const page = await doc.getPage(p);
    const textContent = await page.getTextContent();
    const items = textContent.items.map(i => i.str.trim()).filter(Boolean);
    const raw = items.join(' ');

    // 패턴: CJK한자 + 훈(한글) + 음(한글)
    // 예: "車 수레 거", "金 쇠/성 금"
    const pattern = /([\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff])\s+([가-힣]+(?:\/[가-힣]+)*)\s+([가-힣]+)/g;
    let m;
    while ((m = pattern.exec(raw)) !== null) {
      const [, char, hun, eum] = m;
      if (!hunEumMap[char]) {
        hunEumMap[char] = { hun, eum };
      }
    }
  }

  console.log('Extracted hun/eum pairs from PDF:', Object.keys(hunEumMap).length);
  return hunEumMap;
}

async function main() {
  const hunEumMap = await extractFromPdf();

  // ---- 3. 빈칸만 채우기 ----
  let filled = 0;
  let stillMissing = 0;

  for (const entry of hanjaMeta) {
    if (!entry.hun || !entry.eum) {
      const data = hunEumMap[entry.character];
      if (data) {
        entry.hun = data.hun;
        entry.eum = data.eum;
        filled++;
      } else {
        stillMissing++;
      }
    }
  }

  console.log(`Filled: ${filled}, Still missing: ${stillMissing}`);

  // ---- 4. hanjaMeta.js 저장 ----
  const newContent = metaContent.replace(
    /export const hanjaMeta = \[[\s\S]*\];/,
    `export const hanjaMeta = ${JSON.stringify(hanjaMeta, null, 2)};`
  );
  writeFileSync(metaPath, newContent, 'utf8');
  console.log('hanjaMeta.js updated!');

  // ---- 5. 여전히 비어있는 목록 저장 ----
  const missing = hanjaMeta.filter(h => !h.hun || !h.eum);
  if (missing.length > 0) {
    console.log('\nStill missing sample (first 30):');
    missing.slice(0, 30).forEach(h =>
      console.log(`  ${h.character} (${h.uhmoon || h.daehan || h.korcham || '?'})`)
    );
    writeFileSync(
      join(__dirname, 'missing_huneum.json'),
      JSON.stringify(missing.map(h => ({ char: h.character, grade: h.uhmoon || h.daehan || h.korcham || '?' })), null, 2),
      'utf8'
    );
    console.log('Saved to scripts/missing_huneum.json');
  }
}

main().catch(console.error);
