const fs=require('fs'); 
const d=require('./public/data/strokes/擧.json'); 
let svg = '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">\n'; 
d.forEach((s,i) => { 
  svg += `<path d="${s.path}" fill="black" opacity="0.7" stroke="red" stroke-width="0.5"/>\n`; 
  svg += `<text x="${s.start.x}" y="${s.start.y}" font-size="3" fill="blue">${i+1}</text>\n`; 
}); 
svg += '</svg>'; 
fs.writeFileSync('public/test.svg', svg);
console.log('SVG written to public/test.svg');
