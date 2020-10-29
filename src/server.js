require('module-alias/register');
require('dotenv').config();
const config = require('config');

const http = require('http');
const Koa = require('koa');

const app = new Koa();
const server = http.createServer(app.callback());

app.proxy = config.proxy;
app.keys = require('./middlewares/keygrip');

app.use(require('./middlewares/headers'));
app.use(require('./middlewares/log'));
app.use(require('./middlewares/error'));
app.use(require('./middlewares/static'));
app.use(require('./middlewares/ratelimiter'));
app.use(require('./middlewares/cors'));
app.use(require('./middlewares/logger'));
app.use(require('./middlewares/response-time'));
app.use(require('./middlewares/useragent'));
app.use(require('./middlewares/http-request'));

require('./modules')(app);

server.listen(config.port, () => {
  console.log('\x1b[36m', `Server running at: http://localhost:${config.port}/`);
  console.log('\x1b[36m', 'Mode:', '\x1b[33m', process.env.PROJECT_MODE);
});
