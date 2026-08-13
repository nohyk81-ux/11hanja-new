const fs=require('fs'); 
const cn=JSON.parse(fs.readFileSync('cn.json')); 
const colors=['red','orange','yellow','green','blue','purple','black','brown','cyan','magenta','pink']; 
let svg = cn.strokes.map((s,i) => `<path d="${s}" fill="none" stroke="${colors[i]}" stroke-width="10"/>`).join('\n'); 
svg += '\n' + cn.medians.map((m,i) => `<path d="M ${m.map(p=>p.join(' ')).join(' L ')}" fill="none" stroke="${colors[i]}" stroke-width="3" stroke-dasharray="5,5"/>`).join('\n'); 
svg += '\n' + cn.medians.map((m,i) => {
  const start = m[0];
  return `<circle cx="${start[0]}" cy="${start[1]}" r="15" fill="${colors[i]}" /><text x="${start[0]}" y="${start[1]}" fill="white" font-size="20">${i}</text>`;
}).join('\n');
fs.writeFileSync('debug.svg', `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" transform="scale(1, -1) translate(0, -900)">\n${svg}\n</svg>`);
