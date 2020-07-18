require('dotenv').config();
const config = require('config');
// const util = require('util');
const http = require('http');
const Koa = require('koa');
const Keygrip = require('keygrip');
// const { userAgent } = require('koa-useragent');
const logger = require('koa-logger');
const responseTime = require('koa-response-time');

const app = new Koa();
const server = http.createServer(app.callback());

global.__PROD__ = 'production';
global.__DEV__ = 'development';

app.proxy = false;
app.keys = new Keygrip([config.secretOrKey], 'sha256');

if (global.__DEV__ === process.env.NODE_ENV) {
  app.use(responseTime());
  app.use(logger());
}

// app.use(userAgent);
// app.use(async (ctx) => {
//   const userInfo = util.inspect(ctx.userAgent);
//   console.log(userInfo);
// });

// https://www.npmjs.com/package/koa-body maybe this thing can help (((((

app.use(require('./middlewares/headers-setter'));
app.use(require('./middlewares/log'));
app.use(require('./middlewares/error'));
app.use(require('./middlewares/static'));
app.use(require('./middlewares/ratelimiter'));
app.use(require('./middlewares/cors'));

require('./modules/auth')(app);
require('./modules/user')(app);

server.listen(config.port, () => {
  console.log('\x1b[36m', `Server running at: http://localhost:${config.port}/`);
  console.log('\x1b[36m', 'Mode:', '\x1b[33m', global.__DEV__);
});