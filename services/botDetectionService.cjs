const useragent = require('express-useragent');

function detectBot(userAgent) {
  const ua = useragent.parse(userAgent);
  return ua.isBot; // This returns true if the user-agent belongs to a bot
}

module.exports = { detectBot };
