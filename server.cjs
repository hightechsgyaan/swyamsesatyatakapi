// server.cjs
const express = require('express');
const { detectBot } = require('./services/botDetectionService.cjs'); // Import bot detection
const { prerenderReactSite } = require('./api/prerender.cjs'); // Import prerendering function
const { getPosts, createPost } = require('./api/posts.cjs');
const { getBooks, createBook } = require('./api/books.cjs');
const { getPages, createPage } = require('./api/pages.cjs');
const admin = require('./api/firebaseAdmin.cjs');
require('dotenv').config(); // For environment variables

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// API endpoints remain unchanged (posts, books, pages)

// Handle all routes (check if bot and pre-render)
app.get('*', async (req, res) => {
  const userAgent = req.headers['user-agent'];

  // Detect if it's a bot
  if (detectBot(userAgent)) {
    console.log('Bot detected, prerendering content...');
    try {
      const prerenderedHtml = await prerenderReactSite('https://yourwebsite.com'); // Replace with your React site URL
      res.send(prerenderedHtml); // Send prerendered content for bots
    } catch (error) {
      res.status(500).send('Error during prerendering');
    }
  } else {
    res.sendFile(__dirname + '/index.html'); // Serve the regular React app for non-bots
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
