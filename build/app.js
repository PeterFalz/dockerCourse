"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const http_1 = __importDefault(require("http"));
// Server 03 ... Postgres-Gedöhns
const server03 = http_1.default.createServer((req, res) => {
    var msg = '######';
    (async () => {
        const client = new pg_1.Client({
            host: 'dc-db',
            port: 5432,
            user: 'postgres',
            password: 'secret',
            database: 'postgres' // --- Standard-DB
        });
        await client.connect();
        const { rows } = await client.query('SELECT $1::text AS message', ['Hallo aus PostgreSQL! *']);
        msg = rows[0].message;
        await client.end();
    })();
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(msg + '\n');
    res.end();
});
server03.listen(3003);
(async () => {
    const client = new pg_1.Client({
        host: 'dc-db',
        port: 5432,
        user: 'postgres',
        password: 'secret',
        database: 'postgres' // --- Standard-DB
    });
    await client.connect();
    const { rows } = await client.query('SELECT $1::text AS message', ['Hallo aus PostgreSQL! #']);
    console.log(rows[0].message);
    await client.end();
})();
/*

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
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write( message + '\n' );
  res.end();
});

server01.listen(3001);

*/
