// services/botDetectionService.cjs

function detectBot(userAgent) {
  const botRegex = /(bot|googlebot|crawler|spider|robot|crawling)/i;
  return botRegex.test(userAgent);  // Returns true if user-agent matches common bots
}

module.exports = { detectBot };
