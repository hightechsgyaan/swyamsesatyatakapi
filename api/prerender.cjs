// api/prerender.cjs
const axios = require('axios');

const prerenderReactSite = async (siteUrl) => {
  try {
    // Logic to prerender the site (replace with actual prerendering)
    const response = await axios.get(siteUrl); // Example for pre-rendering
    return response.data; // Returning the prerendered HTML
  } catch (error) {
    console.error('Error during prerendering:', error);
    throw new Error('Prerendering failed');
  }
};

module.exports = { prerenderReactSite };
