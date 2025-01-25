const admin = require('./firebaseAdmin.cjs');

// Fetch posts from Firebase Realtime Database
const getPosts = async () => {
  const ref = admin.database().ref('posts');
  const snapshot = await ref.once('value');
  return snapshot.val();
};

// Create a new post in Firebase
const createPost = async (post) => {
  const ref = admin.database().ref('posts').push();
  await ref.set(post);
  return ref.key; // Return the unique post ID
};

module.exports = { getPosts, createPost };
