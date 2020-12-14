const compose = require('koa-compose');
const Router = require('koa-router');

class RouterFactoryStatic {
  /**
   * @param {Array.<object[]>} routes
   * @param {string} prefix
   * @returns {object} Middleware function
   */
  static create(routes, prefix = '') {
    const router = new Router();
    const checkMethodName = (methodName) => {
      return ['get', 'post', 'put', 'del'].indexOf(methodName) !== -1;
    };

    for (const { method = '', path = '', middlewares = [], callback } of routes) {
      if (!method) {
        throw new Error('Method of route is required!');
      } else if (typeof method !== 'string') {
        throw new TypeError(`Route method should be type of string instead of "${typeof method}"!`);
      } else if (checkMethodName(method) === false) {
        throw new SyntaxError(`Invalid method name ${method}!`);
      }

      if (!path) {
        throw new Error('Path of route is required!');
      } else if (typeof path !== 'string') {
        throw new TypeError(`Path should be string type instead of ${typeof path}!`);
      }

      if (!callback) {
        throw new Error('Callback of route is required!');
      }

      router[method](
        path,
        ...middlewares,
        callback
      );
    }

    if (typeof prefix !== 'string') {
      throw new TypeError(`Prefix should be string type instead of ${typeof prefix}!`);
    }

    router.prefix(prefix);

    return router;
  }

  /**
   * @param {Array.<object[]>} routers
   * @param {object} options
   */
  static initialize({ routers = [], options = {} }) {
    const handledRouters = [];

    // if routers is not a array then statement below convert it into array
    if (!Array.isArray(routers)) {
      routers = [...arguments];
    }

    for (const router of routers.flat()) {
      // console.log('router.param():', router.param());
      // console.log('router.stack:', router.stack);

      handledRouters.push(router.routes());
      handledRouters.push(router.allowedMethods(options));
    }

    // console.log('handledRouters:', handledRouters)

    return compose(handledRouters);
  }

  /**
   * @param {Array.<object[]>} routers
   */
  static merge(routers) {
    if (!Array.isArray(routers)) {
      routers = [...arguments];
    }

    return compose(routers);
  }
}

exports.Router = Router;
exports.RouterFactory = RouterFactoryStatic;
