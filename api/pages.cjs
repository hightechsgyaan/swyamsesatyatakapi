const admin = require('./firebaseAdmin.cjs');

// Fetch pages from Firebase Realtime Database
const getPages = async () => {
  const ref = admin.database().ref('pages');
  const snapshot = await ref.once('value');
  return snapshot.val();
};

// Create a new page in Firebase
const createPage = async (page) => {
  const ref = admin.database().ref('pages').push();
  await ref.set(page);
  return ref.key; // Return the unique page ID
};

module.exports = { getPages, createPage };
