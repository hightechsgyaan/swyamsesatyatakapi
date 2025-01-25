const express = require('express');
const { detectBot } = require('./services/botDetectionService.cjs'); // Import `detectBot`
const { prerenderReactSite } = require('./api/prerender.cjs');
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

  if (detectBot(userAgent)) { // Use `detectBot` here to detect if the request is from a bot
    console.log('Bot detected, prerendering content...');
    const prerenderedHtml = await prerenderReactSite('https://yourwebsite.com'); // Replace with your React site URL
    res.send(prerenderedHtml);
  } else {
    res.sendFile(__dirname + '/index.html'); // Serve the regular React app
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
