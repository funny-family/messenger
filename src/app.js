require('module-alias/register');
require('dotenv').config();
const config = require('config');

const http = require('http');
const Koa = require('koa');

async function bootstrap() {
  const app = new Koa();
  const server = http.createServer(app.callback());

  app.proxy = config.server.proxy;
  app.keys = require('./application/middlewares/global/keygrip');

  app.use(require('./application/middlewares'));
  require('./application/modules')(app);

  await server.listen(config.port);
}

bootstrap()
  .then(() => {
    console.log('\x1b[36m', `Server running at: http://localhost:${config.port}/`);
    console.log('\x1b[36m', 'Mode:', '\x1b[33m', process.env.NODE_ENV);
  })
  .catch((error) => {
    console.error('\x1b[31m', error);
  });
