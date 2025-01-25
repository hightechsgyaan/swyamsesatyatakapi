const puppeteer = require('puppeteer');

const prerenderReactSite = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  const html = await page.content(); // Get the full HTML content after rendering
  await browser.close();
  return html;
};

module.exports = { prerenderReactSite };
