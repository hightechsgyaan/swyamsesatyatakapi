// api/prerender.cjs

const fs = require('fs');
const path = require('path');

const prerenderReactSite = () => {
  // For simplicity, we’ll load a static prerendered HTML file
  const prerenderedHtml = fs.readFileSync(path.join(__dirname, 'prerendered.html'), 'utf8');
  return prerenderedHtml;
};

module.exports = { prerenderReactSite };
