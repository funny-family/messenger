require('dotenv').config();
const config = require('config');
const http = require('http');
const Koa = require('koa');
const logger = require('koa-logger');
const responseTime = require('koa-response-time');

const app = new Koa();
const server = http.createServer(app.callback());

global.__PROD__ = 'production';
global.__DEV__ = 'development';

app.proxy = false;

if (global.__DEV__ === process.env.NODE_ENV) {
  app.use(responseTime({ hrtime: false }));
  app.use(logger());
}

app.use(require('./middlewares/log'));
app.use(require('./middlewares/error'));

require('./modules/auth')(app);
require('./modules/test-model')(app);

server.listen(config.port, () => {
  console.log('\x1b[36m', `Server running at: http://localhost:${config.port}/`);
  console.log('\x1b[36m', 'Mode:', '\x1b[33m', global.__DEV__);
});