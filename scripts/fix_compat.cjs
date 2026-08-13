const fs = require('fs');
const https = require('https');
const path = require('path');

const strokesDir = path.join(__dirname, '../public/data/strokes');

// Number of concurrent requests
const MAX_CONCURRENT = 10;
let activeCount = 0;
let queue = [];
let completedCount = 0;

function fetchHanjaData(char, callback) {
  const normChar = char.normalize('NFD');
  const encoded = encodeURIComponent(normChar);
  const url = `https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1/${encoded}.json`;

  https.get(url, (res) => {
    if (res.statusCode !== 200) {
      res.resume();
      callback(null);
      return;
    }
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        callback(json);
      } catch (e) {
        callback(null);
      }
    });
  }).on('error', () => {
    callback(null);
  });
}

function processNext() {
  if (queue.length === 0) {
    if (activeCount === 0) {
      console.log(`\nFinished processing! Fixed ${completedCount} files.`);
    }
    return;
  }

  while (activeCount < MAX_CONCURRENT && queue.length > 0) {
    const file = queue.shift();
    const char = file.replace('.json', '');
    activeCount++;

    fetchHanjaData(char, (hwData) => {
      if (hwData && hwData.strokes && hwData.medians) {
        const filePath = path.join(strokesDir, file);
        let currentData = [];
        try {
          currentData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        } catch(e) {}
        
        // Ensure array length matches or we recreate
        const newData = hwData.strokes.map((strokePath, i) => {
            const existing = currentData[i] || { order: i + 1, start: { x: 50, y: 50 } };
            return {
                order: existing.order,
                start: existing.start,
                path: strokePath,
                median: hwData.medians[i]
            };
        });

        fs.writeFileSync(filePath, JSON.stringify(newData, null, 2), 'utf8');
        completedCount++;
        process.stdout.write('+');
      } else {
        process.stdout.write('-');
      }

      activeCount--;
      processNext();
    });
  }
}

console.log('Identifying files to fix...');
const files = fs.readdirSync(strokesDir).filter(f => f.endsWith('.json'));

for (const file of files) {
  const filePath = path.join(strokesDir, file);
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (!data || data.length === 0) {
        queue.push(file);
        continue;
    }
    // Check if missing median or has fallback simple path
    if (!data[0].median || !data[0].path || data[0].path.startsWith('M 24 22 L 48 22')) {
        queue.push(file);
    }
  } catch (e) {
    console.log(`Error parsing ${file}`);
    queue.push(file);
  }
}

console.log(`Found ${queue.length} files to fix. Starting fetch...`);
processNext();
