const fs = require('fs');

const cn = JSON.parse(fs.readFileSync('cn.json'));
const jp = JSON.parse(fs.readFileSync('jp.json'));
const colors = ['red','orange','yellow','green','blue','purple','black','brown','cyan','magenta','pink'];

function makeSvg(data, filename) {
  const svg = data.strokes.map((s, i) => `<path d="${s}" fill="none" stroke="${colors[i]}" stroke-width="10" />`).join('\n');
  fs.writeFileSync(filename, `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" transform="scale(1, -1) translate(0, -900)">\n${svg}\n</svg>`);
}

makeSvg(cn, 'cn.svg');
makeSvg(jp, 'jp.svg');
