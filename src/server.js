require('module-alias/register');
require('dotenv').config();
const config = require('config');

const http = require('http');
const Koa = require('koa');

const app = new Koa();
const server = http.createServer(app.callback());

app.proxy = config.proxy;
app.keys = require('./middlewares/global/keygrip');

require('./middlewares')(app);

require('./modules')(app);

server.listen(config.port, () => {
  console.log('\x1b[36m', `Server running at: http://localhost:${config.port}/`);
  console.log('\x1b[36m', 'Mode:', '\x1b[33m', process.env.PROJECT_MODE);
});
