// fill_remaining_108_strokes.mjs
// 1급 희귀자 108자의 공인 옥편/강희자전 기준 총획수(totalStrokes) 및 부수를 100% 채웁니다.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../src/data/hanjaMeta.js');

const STROKE_MAP_108 = {
  '栞': { totalStrokes: 10, radical: '木' },
  '嫝': { totalStrokes: 14, radical: '女' },
  '跭': { totalStrokes: 13, radical: '足' },
  '囧': { totalStrokes: 7, radical: '囗' },
  '嫤': { totalStrokes: 14, radical: '女' },
  '稘': { totalStrokes: 13, radical: '禾' },
  '挐': { totalStrokes: 10, radical: '手' },
  '旲': { totalStrokes: 7, radical: '日' },
  '膧': { totalStrokes: 16, radical: '肉' },
  '曈': { totalStrokes: 16, radical: '日' },
  '阧': { totalStrokes: 7, radical: '阜' },
  '剆': { totalStrokes: 9, radical: '刀' },
  '泠': { totalStrokes: 8, radical: '水' },
  '嚧': { totalStrokes: 19, radical: '口' },
  '錀': { totalStrokes: 16, radical: '金' },
  '撛': { totalStrokes: 15, radical: '手' },
  '慏': { totalStrokes: 13, radical: '心' },
  '洺': { totalStrokes: 9, radical: '水' },
  '媄': { totalStrokes: 12, radical: '女' },
  '嵄': { totalStrokes: 12, radical: '山' },
  '躾': { totalStrokes: 16, radical: '身' },
  '媺': { totalStrokes: 13, radical: '女' },
  '砇': { totalStrokes: 9, radical: '石' },
  '襒': { totalStrokes: 17, radical: '衣' },
  '穦': { totalStrokes: 19, radical: '禾' },
  '嫙': { totalStrokes: 14, radical: '女' },
  '蔎': { totalStrokes: 14, radical: '艸' },
  '貹': { totalStrokes: 12, radical: '貝' },
  '忕': { totalStrokes: 6, radical: '心' },
  '穌': { totalStrokes: 16, radical: '魚' },
  '賥': { totalStrokes: 15, radical: '貝' },
  '榺': { totalStrokes: 14, radical: '木' },
  '氶': { totalStrokes: 5, radical: '水' },
  '塍': { totalStrokes: 13, radical: '土' },
  '妸': { totalStrokes: 8, radical: '女' },
  '婀': { totalStrokes: 11, radical: '女' },
  '唹': { totalStrokes: 11, radical: '口' },
  '嫣': { totalStrokes: 14, radical: '女' },
  '妤': { totalStrokes: 7, radical: '女' },
  '娫': { totalStrokes: 10, radical: '女' },
  '瑌': { totalStrokes: 13, radical: '玉' },
  '曣': { totalStrokes: 20, radical: '日' },
  '熀': { totalStrokes: 14, radical: '火' },
  '埶': { totalStrokes: 11, radical: '土' },
  '玴': { totalStrokes: 9, radical: '玉' },
  '浯': { totalStrokes: 10, radical: '水' },
  '妧': { totalStrokes: 7, radical: '女' },
  '岏': { totalStrokes: 7, radical: '山' },
  '暚': { totalStrokes: 14, radical: '日' },
  '傛': { totalStrokes: 12, radical: '人' },
  '扜': { totalStrokes: 6, radical: '手' },
  '夽': { totalStrokes: 7, radical: '大' },
  '賱': { totalStrokes: 16, radical: '貝' },
  '褑': { totalStrokes: 14, radical: '衣' },
  '琟': { totalStrokes: 12, radical: '玉' },
  '婑': { totalStrokes: 11, radical: '女' },
  '昀': { totalStrokes: 8, radical: '日' },
  '燏': { totalStrokes: 16, radical: '火' },
  '珢': { totalStrokes: 10, radical: '玉' },
  '濦': { totalStrokes: 17, radical: '水' },
  '听': { totalStrokes: 7, radical: '口' },
  '蘟': { totalStrokes: 20, radical: '艸' },
  '檃': { totalStrokes: 18, radical: '木' },
  '訢': { totalStrokes: 11, radical: '言' },
  '媐': { totalStrokes: 12, radical: '女' },
  '熤': { totalStrokes: 15, radical: '火' },
  '朄': { totalStrokes: 15, radical: '日' },
  '芢': { totalStrokes: 7, radical: '艸' },
  '婷': { totalStrokes: 12, radical: '女' },
  '埩': { totalStrokes: 11, radical: '土' },
  '佂': { totalStrokes: 7, radical: '人' },
  '妌': { totalStrokes: 7, radical: '女' },
  '柊': { totalStrokes: 9, radical: '木' },
  '鉒': { totalStrokes: 13, radical: '金' },
  '拄': { totalStrokes: 8, radical: '手' },
  '皗': { totalStrokes: 13, radical: '白' },
  '葰': { totalStrokes: 12, radical: '艸' },
  '竴': { totalStrokes: 18, radical: '竹' },
  '洔': { totalStrokes: 9, radical: '水' },
  '厎': { totalStrokes: 8, radical: '广' },
  '抮': { totalStrokes: 8, radical: '手' },
  '鉁': { totalStrokes: 13, radical: '金' },
  '昣': { totalStrokes: 9, radical: '日' },
  '釥': { totalStrokes: 11, radical: '金' },
  '硨': { totalStrokes: 12, radical: '石' },
  '奲': { totalStrokes: 22, radical: '大' },
  '姹': { totalStrokes: 9, radical: '女' },
  '攢': { totalStrokes: 22, radical: '手' },
  '琗': { totalStrokes: 12, radical: '玉' },
  '棌': { totalStrokes: 12, radical: '木' },
  '婇': { totalStrokes: 11, radical: '女' },
  '茜': { totalStrokes: 9, radical: '艸' },
  '岧': { totalStrokes: 8, radical: '山' },
  '総': { totalStrokes: 14, radical: '糸' },
  '泙': { totalStrokes: 8, radical: '水' },
  '碬': { totalStrokes: 14, radical: '石' },
  '嗃': { totalStrokes: 13, radical: '口' },
  '澖': { totalStrokes: 15, radical: '水' },
  '咍': { totalStrokes: 8, radical: '口' },
  '呟': { totalStrokes: 8, radical: '口' },
  '譞': { totalStrokes: 20, radical: '言' },
  '寭': { totalStrokes: 15, radical: '宀' },
  '皞': { totalStrokes: 15, radical: '白' },
  '皛': { totalStrokes: 15, radical: '白' },
  '歊': { totalStrokes: 14, radical: '欠' },
  '垕': { totalStrokes: 9, radical: '土' },
  '俙': { totalStrokes: 9, radical: '人' },
  '烯': { totalStrokes: 11, radical: '火' }
};

const content = fs.readFileSync(dbPath, 'utf8');
const match = content.match(/export const hanjaMeta = (\[[\s\S]*\]);/);
const hanjaMeta = JSON.parse(match[1]);

let filled = 0;
for (const item of hanjaMeta) {
  if (!item.totalStrokes || typeof item.totalStrokes !== 'number' || item.totalStrokes === 0) {
    const data = STROKE_MAP_108[item.character] || STROKE_MAP_108[item.character.normalize('NFKC')];
    if (data) {
      item.totalStrokes = data.totalStrokes;
      if (!item.radical || item.radical === '부수') {
        item.radical = data.radical;
      }
      filled++;
    }
  }
}

console.log(`Filled remaining strokes: ${filled}`);

const missing = hanjaMeta.filter(h => !h.totalStrokes || typeof h.totalStrokes !== 'number' || h.totalStrokes === 0);
console.log(`Total missing strokes remaining across all 6,111 entries: ${missing.length}`);

const newContent = content.replace(
  /export const hanjaMeta = \[[\s\S]*\];/,
  'export const hanjaMeta = ' + JSON.stringify(hanjaMeta, null, 2) + ';'
);

fs.writeFileSync(dbPath, newContent, 'utf8');
console.log('hanjaMeta.js updated successfully!');
