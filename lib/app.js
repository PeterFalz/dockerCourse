"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var pg_1 = require("pg");
var http_1 = require("http");
var express_1 = require("express");
var path_1 = require("path");
var processenv_1 = require("processenv");
// Default-Output Start
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var client, rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('[' + Date.now().toString() + ' app.ts]>' + 'Begin Default-Output Start');
                client = new pg_1.Client({
                    host: 'dc-db',
                    port: 5432,
                    user: 'postgres',
                    password: 'secret',
                    database: 'postgres' // --- Standard-DB
                });
                return [4 /*yield*/, client.connect()];
            case 1:
                _a.sent();
                return [4 /*yield*/, client.query('SELECT $1::text AS message', ['Hallo aus PostgreSQL! #'])];
            case 2:
                rows = (_a.sent()).rows;
                console.log(rows[0].message);
                return [4 /*yield*/, client.end()];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
// Server 03 ... Postgres-Gedöhns
var server03 = http_1["default"].createServer(function (req, res) {
    console.log('[' + Date.now().toString() + ' app.ts]> ' + 'Call for Server03');
    var msg = '######';
    (function () { return __awaiter(void 0, void 0, void 0, function () {
        var client, rows;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new pg_1.Client({
                        host: 'dc-db',
                        port: 5432,
                        user: 'postgres',
                        password: 'secret',
                        database: 'postgres' // --- Standard-DB
                    });
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client.query('SELECT $1::text AS message', ['Hallo aus PostgreSQL! *'])];
                case 2:
                    rows = (_a.sent()).rows;
                    msg = rows[0].message;
                    return [4 /*yield*/, client.end()];
                case 3:
                    _a.sent();
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(msg + '\n');
                    res.end();
                    return [2 /*return*/];
            }
        });
    }); })();
});
server03.listen(3003);
// /*
// Server 02 ... Express
var api = (0, express_1["default"])();
//api.get('/', (req, res) => {
//  console.log( '[' + Date.now().toString() + ' app.ts]>' + 'Call for Server02' );
//});
api.use(function () {
    console.log('[' + Date.now().toString() + ' app.ts]> ' + 'Call for Server02');
});
api.use('/', express_1["default"].static(path_1["default"].join(__dirname, '..', 'public')));
var server02 = http_1["default"].createServer(api);
server02.listen(3002);
// */
// /*
// Server 01 ... Umgebungsvariable
var message = (0, processenv_1.processenv)('MESSAGE', 'Hello World! #');
var server01 = http_1["default"].createServer(function (req, res) {
    console.log('[' + Date.now().toString() + ' app.ts]> ' + 'Call for Server01');
    //res.statusCode = 200;
    //res.setHeader('Content-Type', 'text/plain');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(message + '\n');
    res.end();
});
server01.listen(3001);
// */
