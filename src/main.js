require('module-alias/register');
require('dotenv').config();
const config = require('config');

const { createServer } = require('http');
const Koa = require('koa');

const app = new Koa();

async function bootstrap() {
  const server = await createServer(app.callback());

  app.proxy = config.app.proxy;
  app.keys = config.app.keys;

  app.use(require('./application/middlewares'));
  app.use(require('./application/modules'));

  server.listen(config.port);
}

bootstrap()
  .then(() => {
    console.log('\x1b[36m', `Server running at: http://localhost:${config.port}/`);
    console.log('\x1b[36m', 'Mode:', '\x1b[33m', process.env.NODE_ENV);
  })
  .catch((error) => {
    console.error('\x1b[31m', error);
  });

module.exports = app;
