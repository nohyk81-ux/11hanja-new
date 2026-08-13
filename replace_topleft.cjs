const fs = require('fs');

const yiao = JSON.parse(fs.readFileSync('./public/data/strokes-hw/爻.json', 'utf8'));
const kyo = JSON.parse(fs.readFileSync('./public/data/strokes-hw/敎.json', 'utf8'));

// Hardcoded target bounding box for 爻 (top left above 子)
const minX = 130, maxX = 490, minY = 480, maxY = 850;

// Find bbox of 爻
let yMinX = 9999, yMaxX = -9999, yMinY = 9999, yMaxY = -9999;
for (let i = 0; i < 4; i++) {
  const coords = yiao.strokes[i].match(/[+-]?\d*\.?\d+/g).map(Number);
  for(let j=0; j<coords.length; j+=2) {
    if(coords[j] < yMinX) yMinX = coords[j];
    if(coords[j] > yMaxX) yMaxX = coords[j];
    if(coords[j+1] < yMinY) yMinY = coords[j+1];
    if(coords[j+1] > yMaxY) yMaxY = coords[j+1];
  }
}

const scaleX = (maxX - minX) / (yMaxX - yMinX);
const scaleY = (maxY - minY) / (yMaxY - yMinY);
const scale = Math.min(scaleX, scaleY) * 0.9; // scale down slightly

const transX = minX + (maxX - minX) / 2 - (yMinX + (yMaxX - yMinX) / 2) * scale;
const transY = minY + (maxY - minY) / 2 - (yMinY + (yMaxY - yMinY) / 2) * scale;

const transformPath = (p) => {
  let isFirst = true;
  return p.replace(/([A-Za-z]+)\s*([+-]?\d*\.?\d+)\s*,\s*([+-]?\d*\.?\d+)/g, (m, cmd, xStr, yStr) => {
    // Wait, hanzi-writer CDN paths don't always have spaces before commas.
    // Let's use a simpler approach: extract all numbers and replace them.
  });
};

// A better path transformer that scales all coordinate pairs properly
const transformSvgPath = (pathStr) => {
  return pathStr.replace(/([+-]?\d*\.?\d+)/g, (match, numStr, offset, fullStr) => {
    // We need to know if this number is X or Y.
    // In hanzi-writer format, paths are like M388,654C400,658 415,661
    // Let's just find matches of X,Y pairs.
  });
};

// Easiest is to replace "X,Y" pairs
const transformXYPairs = (pathStr) => {
  return pathStr.replace(/([+-]?\d*\.?\d+)\s*,\s*([+-]?\d*\.?\d+)/g, (m, xStr, yStr) => {
    const x = parseFloat(xStr) * scale + transX;
    const y = parseFloat(yStr) * scale + transY;
    return `${Math.round(x)},${Math.round(y)}`;
  });
};

const transformMedian = (median) => {
  return median.map(pt => [
    Math.round(pt[0] * scale + transX),
    Math.round(pt[1] * scale + transY)
  ]);
};

// Replace first 4 strokes and medians
for (let i = 0; i < 4; i++) {
  kyo.strokes[i] = transformXYPairs(yiao.strokes[i]);
  kyo.medians[i] = transformMedian(yiao.medians[i]);
}

fs.writeFileSync('./public/data/strokes-hw/敎.json', JSON.stringify(kyo));
console.log('Replaced top-left with 爻 successfully.');
