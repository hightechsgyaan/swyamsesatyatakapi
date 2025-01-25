// server.cjs

const express = require('express');
const { detectBot } = require('./services/botDetectionService.cjs');
const { prerenderReactSite } = require('./api/prerender.cjs');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Serve regular React app assets
app.use(express.static(path.join(__dirname, 'public')));

// Check for bot detection or specific route to serve prerendered HTML
app.get('*', async (req, res) => {
  const userAgent = req.headers['user-agent'];

  // Check if it's a bot or it's the homepage ('/')
  if (detectBot(userAgent) || req.url === '/') {
    console.log('Serving prerendered content...');
    const prerenderedHtml = prerenderReactSite();
    res.send(prerenderedHtml);  // Serve prerendered content
  } else {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve regular React app for other routes
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
