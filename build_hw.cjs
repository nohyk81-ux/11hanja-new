const fs = require('fs');

const char = process.argv[2];
if (!char) {
  console.error("Usage: node build_hw.cjs <character>");
  process.exit(1);
}

const inputStr = fs.readFileSync(`public/data/strokes/${char}.json`, 'utf8');
const data = JSON.parse(inputStr);

// hanzi-writer expects 1024x1024 grid, y-axis inverted.
// Our data is 100x100 grid, y-axis down.
const scaleX = (x) => x * 10.24;
const scaleY = (y) => (100 - y) * 10.24;

// Basic regex to find all coordinates in a path
const coordRegex = /([+-]?\d*\.?\d+)\s*,\s*([+-]?\d*\.?\d+)|([+-]?\d*\.?\d+)\s+([+-]?\d*\.?\d+)/g;

const strokes = [];
const medians = [];

data.forEach(stroke => {
  // Convert path
  let path = stroke.path;
  // Replace all coordinates
  path = path.replace(/[0-9.]+\s+[0-9.]+/g, (match) => {
    const parts = match.trim().split(/\s+/);
    if (parts.length === 2) {
      const x = parseFloat(parts[0]);
      const y = parseFloat(parts[1]);
      return `${scaleX(x)} ${scaleY(y)}`;
    }
    return match;
  });

  strokes.push(path);

  // Generate a median from start to the furthest coordinate in the path
  const matches = [...stroke.path.matchAll(/[0-9.]+\s+[0-9.]+/g)];
  let maxDist = 0;
  let endX = stroke.start.x;
  let endY = stroke.start.y;
  
  if (matches.length > 0) {
    for (const match of matches) {
      const parts = match[0].trim().split(/\s+/);
      if (parts.length === 2) {
        const x = parseFloat(parts[0]);
        const y = parseFloat(parts[1]);
        const dist = Math.pow(x - stroke.start.x, 2) + Math.pow(y - stroke.start.y, 2);
        if (dist > maxDist) {
          maxDist = dist;
          endX = x;
          endY = y;
        }
      }
    }
  }

  // Medians: start to end line (extended by 20% on both sides to prevent cut-offs)
  const sx = scaleX(stroke.start.x);
  const sy = scaleY(stroke.start.y);
  const ex = scaleX(endX);
  const ey = scaleY(endY);
  const dx = ex - sx;
  const dy = ey - sy;
  medians.push([
    [Math.round(sx - dx * 0.2), Math.round(sy - dy * 0.2)],
    [Math.round(ex + dx * 0.2), Math.round(ey + dy * 0.2)]
  ]);
});

const hwData = {
  strokes,
  medians
};

fs.mkdirSync('public/data/strokes-hw', { recursive: true });
fs.writeFileSync(`public/data/strokes-hw/${char}.json`, JSON.stringify(hwData));
console.log(`Done processing ${char}!`);
