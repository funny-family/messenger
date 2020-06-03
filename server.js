require('dotenv').config();
const config = require('config');
const http = require('http');
const Koa = require('koa');

const app = new Koa();
const server = http.createServer(app.callback());

server.listen(config.port, () => {
  console.log(`Server running at: http://localhost:${config.port}/`);
});