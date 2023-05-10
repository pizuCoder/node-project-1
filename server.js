const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    fs.readFile('index.html', (err, data) => {
      if (err) throw err;
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
  } else if (req.url === '/addMessage' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const message = decodeURIComponent(body.split('=')[1]);
      fs.appendFile('messages.html', `<p>${message}</p>\n`, (err) => {
        if (err) throw err;
        fs.readFile('messages.html', (err, data) => {
          if (err) throw err;
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.write(data);
          res.end();
        });
      });
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('404 Not Found');
    res.end();
  }
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
