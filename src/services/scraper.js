const axios = require('axios');
const cheerio = require('cheerio');

async function fetchMeta(url, timeout = 10000) {
  try {
    const res = await axios.get(url, { timeout, headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MIPBot/1.0)' }});
    const html = res.data;
    const $ = cheerio.load(html);
    const title = $('head > title').text() || $('meta[property="og:title"]').attr('content') || '';
    const description = $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content') || '';
    const icon = $('link[rel="icon"]').attr('href') || $('link[rel="shortcut icon"]').attr('href') || $('meta[property="og:image"]').attr('content') || '';
    // normalize icon URL relative to page
    let iconUrl = icon;
    if (icon && !icon.startsWith('http')) {
      const base = new URL(url).origin;
      if (icon.startsWith('/')) iconUrl = base + icon;
      else iconUrl = base + '/' + icon;
    }
    return { title, description, icon: iconUrl };
  } catch (err) {
    console.warn('fetchMeta error', url, err.message);
    return { title: '', description: '', icon: '' };
  }
}

module.exports = { fetchMeta };
