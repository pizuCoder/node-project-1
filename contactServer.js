const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    fs.readFile('index.html', (err, data) => {
      if (err) throw err;
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
  } else if (req.url === '/submit' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      const { name, email, message } = querystring.parse(body);
      const data = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n\n`;
      fs.appendFile('messages.txt', data, err => {
        if (err) throw err;
        res.writeHead(302, { 'Location': '/' });
        res.end();
      });
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('404 Not Found');
    res.end();
  }
});

server.listen(3000, () => console.log('Server running on port 3000'));
