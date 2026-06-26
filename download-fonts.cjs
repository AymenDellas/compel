const https = require('https');
const fs = require('fs');

const getBase64Font = (weight) => {
  return new Promise((resolve, reject) => {
    // Normal modern User-Agent gets WOFF2 from Google Fonts API
    const options = {
      hostname: 'fonts.googleapis.com',
      path: `/css2?family=Outfit:wght@${weight}&display=swap`,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' 
      }
    };

    https.get(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const match = data.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/i);
        if (match && match[1]) {
          const fontUrl = match[1];
          https.get(fontUrl, (fontRes) => {
            const chunks = [];
            fontRes.on('data', chunk => chunks.push(chunk));
            fontRes.on('end', () => {
              const buffer = Buffer.concat(chunks);
              resolve(buffer.toString('base64'));
            });
            fontRes.on('error', reject);
          }).on('error', reject);
        } else {
          reject(new Error('Could not find WOFF2 URL in CSS'));
        }
      });
    }).on('error', reject);
  });
};

async function run() {
  console.log("Fetching WOFF2 fonts and encoding...");
  try {
    const lightB64 = await getBase64Font('100');
    console.log("Downloaded Light");
    const boldB64 = await getBase64Font('700');
    console.log("Downloaded Bold");
    
    fs.writeFileSync('fonts-base64.json', JSON.stringify({ light: lightB64, bold: boldB64 }));
    console.log("Saved to fonts-base64.json");
  } catch (e) {
    console.error(e);
  }
}

run();
