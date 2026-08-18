// fill_huneum_manual.mjs - 자동 추출 후 남은 글자를 수동 매핑으로 채웁니다.
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const metaPath = join(__dirname, '../src/data/hanjaMeta.js');

const MANUAL_MAP = {
  '兩': { hun: '두', eum: '양' },
  '勞': { hun: '수고로울', eum: '로' },
  '釥': { hun: '작을', eum: '초' },
  '貹': { hun: '재물', eum: '지' },
  '忕': { hun: '버릇', eum: '태' },
  '穌': { hun: '깨어날', eum: '소' },
  '賥': { hun: '재물', eum: '취' },
  '榺': { hun: '나무이름', eum: '박' },
  '氶': { hun: '받들', eum: '승' },
  '塍': { hun: '두렁', eum: '승' },
  '妸': { hun: '예쁠', eum: '아' },
  '婀': { hun: '아름다울', eum: '아' },
  '唹': { hun: '웃을', eum: '오' },
  '嫣': { hun: '아름다울', eum: '언' },
  '妤': { hun: '예쁠', eum: '여' },
  '娫': { hun: '예쁠', eum: '연' },
  '瑌': { hun: '옥이름', eum: '경' },
  '曣': { hun: '밝을', eum: '연' },
  '熀': { hun: '빛날', eum: '황' },
  '埶': { hun: '심을', eum: '예' },
  '玴': { hun: '옥이름', eum: '억' },
  '浯': { hun: '강이름', eum: '오' },
  '妧': { hun: '예쁠', eum: '원' },
  '岏': { hun: '산높을', eum: '완' },
  '暚': { hun: '밝을', eum: '요' },
  '傛': { hun: '용렬할', eum: '용' },
  '扜': { hun: '당길', eum: '우' },
  '夽': { hun: '탄식할', eum: '우' },
  '賱': { hun: '재물', eum: '윤' },
  '褑': { hun: '옷이름', eum: '원' },
  '琟': { hun: '옥이름', eum: '위' },
  '婑': { hun: '예쁠', eum: '와' },
  '昀': { hun: '빛날', eum: '윤' },
  '燏': { hun: '빛날', eum: '율' },
  '珢': { hun: '옥이름', eum: '은' },
  '濦': { hun: '물이름', eum: '은' },
  '听': { hun: '웃을', eum: '은' },
  '蘟': { hun: '풀이름', eum: '은' },
  '檃': { hun: '나무이름', eum: '은' },
  '訢': { hun: '기뻐할', eum: '흔' },
  '媐': { hun: '기쁠', eum: '희' },
  '熤': { hun: '빛날', eum: '이' },
  '朄': { hun: '북소리', eum: '인' },
  '芢': { hun: '풀이름', eum: '인' },
  '婷': { hun: '아름다울', eum: '정' },
  '埩': { hun: '땅이름', eum: '증' },
  '佂': { hun: '두려울', eum: '정' },
  '妌': { hun: '예쁠', eum: '정' },
  '柊': { hun: '나무이름', eum: '종' },
  '鉒': { hun: '쇠', eum: '주' },
  '拄': { hun: '버틸', eum: '주' },
  '皗': { hun: '흰빛', eum: '주' },
  '葰': { hun: '풀이름', eum: '수' },
  '竴': { hun: '대이름', eum: '준' },
  '洔': { hun: '물가', eum: '지' },
  '厎': { hun: '숫돌', eum: '지' },
  '抮': { hun: '당길', eum: '진' },
  '鉁': { hun: '쇠', eum: '진' },
  '昣': { hun: '밝을', eum: '진' },
  '硨': { hun: '돌이름', eum: '차' },
  '奲': { hun: '너그러울', eum: '차' },
  '姹': { hun: '예쁠', eum: '타' },
  '攢': { hun: '모을', eum: '찬' },
  '琗': { hun: '옥이름', eum: '창' },
  '棌': { hun: '나무이름', eum: '채' },
  '婇': { hun: '예쁠', eum: '채' },
  '茜': { hun: '꼭두서니', eum: '천' },
  '岧': { hun: '산높을', eum: '초' },
  '総': { hun: '거느릴', eum: '총' },
  '泙': { hun: '물소리', eum: '평' },
  '碬': { hun: '숫돌', eum: '하' },
  '嗃': { hun: '엄숙할', eum: '학' },
  '澖': { hun: '물이름', eum: '한' },
  '咍': { hun: '웃을', eum: '해' },
  '呟': { hun: '소리', eum: '현' },
  '譞': { hun: '지혜로울', eum: '현' },
  '寭': { hun: '밝을', eum: '혜' },
  '皞': { hun: '흰빛', eum: '호' },
  '皛': { hun: '흰빛', eum: '효' },
  '歊': { hun: '김오를', eum: '효' },
  '垕': { hun: '두터울', eum: '후' },
  '俙': { hun: '희미할', eum: '희' },
  '烯': { hun: '빛날', eum: '희' },
};

async function main() {
  const metaContent = readFileSync(metaPath, 'utf8');
  const metaMatch = metaContent.match(/export const hanjaMeta = (\[[\s\S]*\]);/);
  const hanjaMeta = JSON.parse(metaMatch[1]);

  const missingBefore = hanjaMeta.filter(h => !h.hun || !h.eum).length;
  console.log('Missing before:', missingBefore);

  let filled = 0;
  let stillMissing = 0;

  for (const entry of hanjaMeta) {
    if (!entry.hun || !entry.eum) {
      const data = MANUAL_MAP[entry.character];
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

  const newContent = metaContent.replace(
    /export const hanjaMeta = \[[\s\S]*\];/,
    `export const hanjaMeta = ${JSON.stringify(hanjaMeta, null, 2)};`
  );
  writeFileSync(metaPath, newContent, 'utf8');
  console.log('hanjaMeta.js updated!');

  const missing = hanjaMeta.filter(h => !h.hun || !h.eum);
  if (missing.length > 0) {
    console.log('\nStill missing:');
    missing.forEach(h => console.log(`  ${h.character} (${h.uhmoon || h.daehan || h.korcham || '?'})`));
    writeFileSync(
      join(__dirname, 'missing_huneum.json'),
      JSON.stringify(missing.map(h => ({ char: h.character, grade: h.uhmoon || h.daehan || h.korcham || '?' })), null, 2),
      'utf8'
    );
  } else {
    console.log('\n모든 뜻음이 완성되었습니다! 🎉');
  }
}

main().catch(console.error);
