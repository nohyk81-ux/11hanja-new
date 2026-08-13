const fs = require('fs');
const data = require('./public/data/strokes/擧.json');

// Fix floating Stroke 3 (index 2) by shifting it up (Y-2) and left (X-1)
let s3 = data[2].path;
s3 = s3.replace(/[0-9.]+\s+[0-9.]+/g, m => {
  let [x,y] = m.trim().split(/\s+/).map(Number);
  return `${(x-1.0).toFixed(1)} ${(y-2.0).toFixed(1)}`;
});
data[2].path = s3;
data[2].start.x -= 1.0;
data[2].start.y -= 2.0;

// Replace Stroke 14 (index 13) with a Pie stroke
data[13].path = 'M 50.0 45.0 Q 40.0 55.0 20.0 65.0 Q 23.0 67.0 43.0 57.0 Q 51.0 48.0 52.0 46.0 Z';
data[13].start = {x: 50.0, y: 45.0};

fs.writeFileSync('./public/data/strokes/擧.json', JSON.stringify(data));
console.log('Fixed!');
