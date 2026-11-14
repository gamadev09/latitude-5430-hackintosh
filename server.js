const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX_PATH = path.join(__dirname, 'index.html');
const LOCAL_WALLPAPER = path.join(__dirname, 'wallpaper.jpg');
const UPLOADED_WALLPAPER = 'C:\\Users\\gamve\\.gemini\\antigravity-cli\\brain\\4dd5cdbe-7d1c-4fb2-976b-2b0aafb8f2e4\\.user_uploaded\\uploaded_media_1794690554970.jpg';

const server = http.createServer((req, res) => {
  if (req.url === '/wallpaper.jpg') {
    const imgPath = fs.existsSync(LOCAL_WALLPAPER) ? LOCAL_WALLPAPER : UPLOADED_WALLPAPER;
    fs.readFile(imgPath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Wallpaper not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      res.end(data);
    });
    return;
  }

  if (req.url === '/' || req.url === '/index.html') {
    fs.readFile(INDEX_PATH, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error loading index.html');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`Latitude 5430 Hackintosh Guide running at http://localhost:${PORT}`);
});
