const http = require('http');

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === '/home') {
    res.write('Welcome home');
    res.end();
  } else if (url === '/about') {
    res.write('Welcome to About Us page');
    res.end();
  } else if (url === '/node') {
    res.write('Welcome to my Node Js project');
    res.end();
  } else {
    res.write('404 Page not found');
    res.end();
  }
});

server.listen(4000, () => {
  console.log('Server running on port 4000');
});
