import { Client } from 'pg';
import http from 'http';
import express from 'express';
import path from 'path';
import { processenv } from 'processenv';

// Default-Output Start
(async () => {
  const client = new Client({
    host: 'dc-db',              // --- network-alias aus run-Command
    port: 5432,                 // --- Standard-Port
    user: 'postgres',           // --- Standard-User
    password: 'secret',         // --- POSTGRES_PASSWORD aus run-Command
    database: 'postgres'        // --- Standard-DB
  });

  await client.connect();
  const { rows } = await client.query(
    'SELECT $1::text AS message', [ 'Hallo aus PostgreSQL! #']
  );

  console.log( rows[0].message );

  await client.end();
})();


// Server 03 ... Postgres-Gedöhns
const server03 = http.createServer((req, res) => {
  var msg = '######';

  (async () => {
    const client = new Client({
      host: 'dc-db',              // --- network-alias aus run-Command
      port: 5432,                 // --- Standard-Port
      user: 'postgres',           // --- Standard-User
      password: 'secret',         // --- POSTGRES_PASSWORD aus run-Command
      database: 'postgres'        // --- Standard-DB
    });
  
    await client.connect();
    const { rows } = await client.query(
      'SELECT $1::text AS message', [ 'Hallo aus PostgreSQL! *']
    );
  
    msg = rows[0].message;

    await client.end();
  
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write( msg + '\n' );
    res.end();
  })();
});

server03.listen(3003);

// /*
// Server 02 ... Express
const api = express();
api.use('/', express.static(path.join(__dirname, '..', 'public')));
const server02 = http.createServer(api);
server02.listen(3002);
// */

// /*
// Server 01 ... Umgebungsvariable
const message = processenv('MESSAGE', 'Hello World! #');
const server01 = http.createServer((req, res) => {
  //res.statusCode = 200;
  //res.setHeader('Content-Type', 'text/plain');
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write( message + '\n' );
  res.end();
});

server01.listen(3001);
// */
