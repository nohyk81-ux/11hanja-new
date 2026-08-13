const fs = require('fs');
const d = require('./public/data/strokes-hw/舉.json');
let svg = '<svg viewBox="0 0 1024 1024" transform="scale(1, -1) translate(0, -1024)" xmlns="http://www.w3.org/2000/svg">\n';
d.strokes.forEach((s) => {
  svg += `<path d="${s}" fill="black" opacity="0.7" stroke="red" stroke-width="0.5"/>\n`;
});
svg += '</svg>';
fs.writeFileSync('public/test_ju.svg', svg);
console.log('Done');
