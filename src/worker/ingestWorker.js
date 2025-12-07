// Simple placeholder to show where ingestion jobs live (ads API pollers, scrapers, OCR)
async function start() {
  console.log('Ingest worker placeholder started. Add your ingestion jobs here.');
  // Example: poll external API every N minutes, or watch local folder for creatives
}
if (require.main === module) start();
module.exports = { start };
