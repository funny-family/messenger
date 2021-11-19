const compose = require('koa-compose');

/**
 * @param {Array.<object[]>} routers
*/
exports.merge = function (middlewares) {
  if (!Array.isArray(middlewares)) {
    middlewares = [...arguments];
  }

  return compose(middlewares);
};
