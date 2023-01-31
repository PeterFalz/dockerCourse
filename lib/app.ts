import http from 'http';

import express from 'express';
import path from 'path';

import { processenv } from 'processenv';


// Server 02 ... Express
const api = express();
api.use('/', express.static(path.join(__dirname, '..', 'public')));
const server02 = http.createServer(api);
server02.listen(3002);

// /*
// Server 01 ... Umgebungsvariable
const message = processenv('MESSAGE', 'Hello World! #');
const server01 = http.createServer((req, res) => {
  //res.statusCode = 200;
  //res.setHeader('Content-Type', 'text/plain');
  res.writeHead(200, {'Content-Type': 'text/phtml'});
  res.write( message + '\n' );
  res.end();
});

server01.listen(3001);
// */
