fetch('http://localhost:5173/data/strokes-hw/%E7%9B%B4.json?v=5').then(r=>r.json()).then(d=>console.log(d.strokes[2]))
