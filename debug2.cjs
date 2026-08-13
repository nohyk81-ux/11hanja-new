const fs=require('fs'); 
const jp=JSON.parse(fs.readFileSync('jp.json')); 
const colors=['red','orange','yellow','green','blue','purple','black','brown','cyan','magenta','pink']; 
let svg = jp.strokes.map((s,i) => `<path d="${s}" fill="none" stroke="${colors[i]}" stroke-width="10"/>`).join('\n'); 
svg += '\n' + jp.medians.map((m,i) => `<path d="M ${m.map(p=>p.join(' ')).join(' L ')}" fill="none" stroke="${colors[i]}" stroke-width="3" stroke-dasharray="5,5"/>`).join('\n'); 
svg += '\n' + jp.medians.map((m,i) => {
  const start = m[0];
  return `<circle cx="${start[0]}" cy="${start[1]}" r="15" fill="${colors[i]}" /><text x="${start[0]}" y="${start[1]}" fill="white" font-size="20">${i}</text>`;
}).join('\n');
fs.writeFileSync('C:\\Users\\노\\.gemini\\antigravity\\brain\\e0ef33d1-548a-41a2-8f11-30a25464940c\\jp_debug.svg', `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" transform="scale(1, -1) translate(0, -900)">\n${svg}\n</svg>`);
