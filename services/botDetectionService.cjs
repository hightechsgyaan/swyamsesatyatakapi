// const useragent = require('useragent'); // No longer needed with the new approach

const isBot = (userAgent) => {
  if (!userAgent) {
    return false; // No user agent, not a bot
  }

  // Convert to lowercase for case-insensitive matching
  const lowerCaseUserAgent = userAgent.toLowerCase();

  // List of known bot user agent patterns (case-insensitive)
  const botPatterns = [
    'bot',
    'spider',
    'crawler',
    'facebookexternalhit', // Facebook
    'linkedinbot',         // LinkedIn
    'twitterbot',          // Twitter
    'googlebot',           // Google
    'bingbot',             // Bing
    'slurp',               // Yahoo
    'duckduckbot',         // DuckDuckGo
    'baiduspider',         // Baidu
    'yandexbot',           // Yandex
  ];

  return botPatterns.some(pattern => lowerCaseUserAgent.includes(pattern));
};

module.exports = { isBot };
