const admin = require('./firebaseAdmin.cjs');

// Fetch books from Firebase Realtime Database
const getBooks = async () => {
  const ref = admin.database().ref('books');
  const snapshot = await ref.once('value');
  return snapshot.val();
};

// Create a new book in Firebase
const createBook = async (book) => {
  const ref = admin.database().ref('books').push();
  await ref.set(book);
  return ref.key; // Return the unique book ID
};

module.exports = { getBooks, createBook };
