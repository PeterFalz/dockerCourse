'use strict';

const http = require('http');
const { processenv } = require('processenv');

const message = processenv('MESSAGE', 'Hello World! #')

const server = http.createServer((req, res) => {
  //res.statusCode = 200;
  //res.setHeader('Content-Type', 'text/plain');
  res.writeHead(200, {'Content-Type': 'text/phtml'});
  res.write( message + '\n' );
  res.end();
});

server.listen(3000);

/*
const hostname = '127.0.0.1';
const port = 3000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/
