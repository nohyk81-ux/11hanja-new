const fs = require('fs');

const inputStr = fs.readFileSync('public/data/strokes/絹.json', 'utf8');
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

  // Generate a simple 2-point median from start to the last coordinate in the path
  const matches = [...stroke.path.matchAll(/[0-9.]+\s+[0-9.]+/g)];
  let lastX = stroke.start.x;
  let lastY = stroke.start.y;
  
  if (matches.length > 0) {
    const parts = matches[matches.length - 1][0].trim().split(/\s+/);
    lastX = parseFloat(parts[0]);
    lastY = parseFloat(parts[1]);
  }

  medians.push([
    [scaleX(stroke.start.x), scaleY(stroke.start.y)],
    [scaleX(lastX), scaleY(lastY)]
  ]);
});

const hwData = {
  strokes,
  medians
};

fs.mkdirSync('public/data/strokes-hw', { recursive: true });
fs.writeFileSync('public/data/strokes-hw/絹.json', JSON.stringify(hwData));
console.log('Done!');
