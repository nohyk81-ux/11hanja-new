const fs = require('fs');
const https = require('https');
const path = require('path');

async function fetchMedians(char) {
  return new Promise((resolve) => {
    const req = https.get('https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1/' + encodeURIComponent(char) + '.json', { timeout: 3000 }, (res) => {
      if (res.statusCode !== 200) {
        resolve(null);
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data).medians);
        } catch (e) {
          resolve(null);
        }
      });
    });
    req.on('error', () => resolve(null));
    req.on('timeout', () => {
      req.abort();
      resolve(null);
    });
  });
}

async function run() {
  const files = fs.readdirSync('public/data/strokes').filter(f => f.endsWith('.json'));
  console.log('Updating ' + files.length + ' files...');
  
  const concurrency = 20;
  let active = 0;
  let index = 0;
  let completed = 0;

  return new Promise((resolve) => {
    function next() {
      if (index >= files.length) {
        if (active === 0) resolve();
        return;
      }
      
      const f = files[index++];
      const char = f.replace('.json', '');
      const p = 'public/data/strokes/' + f;
      
      let obj;
      try {
        obj = JSON.parse(fs.readFileSync(p, 'utf8'));
      } catch (e) {
        completed++;
        next();
        return;
      }

      // If median already exists, skip fetching
      if (obj[0] && obj[0].median) {
        completed++;
        next();
        return;
      }
      
      active++;
      fetchMedians(char).then(medians => {
        if (medians) {
          medians.forEach((m, idx) => {
            if(obj[idx]) obj[idx].median = m;
          });
          fs.writeFileSync(p, JSON.stringify(obj));
        }
        
        active--;
        completed++;
        if (completed % 100 === 0) {
          console.log(completed + ' done');
        }
        next();
      });
      
      // Start more if under concurrency limit
      while (active < concurrency && index < files.length) {
        next();
      }
    }
    
    // Kick off initial batch
    for (let i = 0; i < concurrency; i++) {
      next();
    }
  });
}

run().then(() => console.log('All done!'));
