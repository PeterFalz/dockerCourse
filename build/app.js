"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const processenv_1 = require("processenv");
// Server 02 ... Express
const api = (0, express_1.default)();
api.use('/', express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
const server02 = http_1.default.createServer(api);
server02.listen(3002);
// /*
// Server 01 ... Umgebungsvariable
const message = (0, processenv_1.processenv)('MESSAGE', 'Hello World! #');
const server01 = http_1.default.createServer((req, res) => {
    //res.statusCode = 200;
    //res.setHeader('Content-Type', 'text/plain');
    res.writeHead(200, { 'Content-Type': 'text/phtml' });
    res.write(message + '\n');
    res.end();
});
server01.listen(3001);
// */
