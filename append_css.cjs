const fs = require('fs');
const additionalCss = `
/* --- Worksheet Preview Layout Enhancements --- */
.preview-body {
  background: #64748b;
  padding: 2rem;
  min-height: 100vh;
  overflow-x: auto;
}

@media (max-width: 768px) {
  .preview-toolbar {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    padding: 1rem;
    border-radius: 0;
  }
  
  .toolbar-title {
    font-size: 1rem;
    justify-content: center;
    text-align: center;
    line-height: 1.4;
    word-break: keep-all;
  }
  
  .preview-toolbar-actions {
    justify-content: center;
  }
  
  .preview-body {
    padding: 1.5rem 1rem;
  }
}
`;
fs.appendFileSync('src/styles/main.css', additionalCss);
console.log('CSS appended.');
