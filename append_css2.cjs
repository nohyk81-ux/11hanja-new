const fs = require('fs');
const additionalCss = `
@media (max-width: 768px) {
  .site-footer {
    padding: 1.5rem 1rem;
  }
  .footer-links {
    gap: 0.5rem;
  }
}
`;
fs.appendFileSync('src/styles/main.css', additionalCss);
console.log('Footer mobile CSS appended.');
