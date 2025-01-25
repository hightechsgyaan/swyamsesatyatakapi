const express = require('express');
const { isBot } = require('./services/botDetectionService.cjs');
const { prerenderReactSite } = require('./api/prerender.cjs');
const { getPosts, createPost } = require('./api/posts.cjs');
const { getBooks, createBook } = require('./api/books.cjs');
const { getPages, createPage } = require('./api/pages.cjs');
const admin = require('./api/firebaseAdmin.cjs');
require('dotenv').config(); // For environment variables

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// API endpoint to fetch posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await getPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send('Error fetching posts');
  }
});

// API endpoint to create a post
app.post('/api/posts', async (req, res) => {
  try {
    const post = req.body;
    const postId = await createPost(post);
    res.status(201).json({ id: postId });
  } catch (error) {
    res.status(500).send('Error creating post');
  }
});

// API endpoint to fetch books
app.get('/api/books', async (req, res) => {
  try {
    const books = await getBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).send('Error fetching books');
  }
});

// API endpoint to create a book
app.post('/api/books', async (req, res) => {
  try {
    const book = req.body;
    const bookId = await createBook(book);
    res.status(201).json({ id: bookId });
  } catch (error) {
    res.status(500).send('Error creating book');
  }
});

// API endpoint to fetch pages
app.get('/api/pages', async (req, res) => {
  try {
    const pages = await getPages();
    res.status(200).json(pages);
  } catch (error) {
    res.status(500).send('Error fetching pages');
  }
});

// API endpoint to create a page
app.post('/api/pages', async (req, res) => {
  try {
    const page = req.body;
    const pageId = await createPage(page);
    res.status(201).json({ id: pageId });
  } catch (error) {
    res.status(500).send('Error creating page');
  }
});

// Handle all routes (check if bot and pre-render)
app.get('*', async (req, res) => {
  const userAgent = req.headers['user-agent'];

  if (isBot(userAgent)) {
    console.log('Bot detected, prerendering content...');
    const prerenderedHtml = await prerenderReactSite('https://yourwebsite.com'); // Replace with the URL of your React site
    res.send(prerenderedHtml);
  } else {
    res.sendFile(__dirname + '/index.html'); // Serve the regular React app
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
