const compose = require('koa-compose');

const globalMiddlewares = [
  require('./global/headers'),
  require('./global/error'),
  require('./global/static'),
  require('./global/ratelimiter'),
  require('./global/cors'),
  require('./global/useragent'),
  require('./global/http-request'),
  require('./global/log'),
  require('./global/http-request-logger'),
  require('./global/response-time')
];

const localMiddlewares = [];

module.exports = compose(
  [...globalMiddlewares, ...localMiddlewares].map((middleware) => {
    return middleware;
  })
);
