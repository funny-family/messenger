const KoaRouter = require('koa-router');

function createRoutes(routes, prefix = '') {
  // const routePathRegex = /^\/(.*)\/(?:([^\/]+?))\/?$/;
  const routePathRegex = /^\/(.*)(?:([^\/]+?))\/?$/;

  const newRoute = new KoaRouter();

  const checkMethodName = (methodName) => {
    return ['get', 'post', 'put', 'del'].indexOf(methodName) !== -1;
  };

  for (const { method = '', path = '', middlewares = [], callback } of routes) {
    if (typeof method !== 'string') {
      throw new TypeError(`Route method should be type of string instead of "${typeof method}"!`);
    } else if (checkMethodName(method) === false) {
      throw new SyntaxError(`Invalid method name ${method}!`);
    }

    if (typeof path !== 'string') {
      throw new TypeError(`Path should be string type instead of ${typeof path}!`);
    }

    newRoute[method](
      path,
      ...middlewares,
      callback
    );
  }

  if (typeof prefix !== 'string') {
    throw new TypeError(`Prefix should be string type instead of ${typeof prefix}!`);
  }

  if (routePathRegex.test(prefix) === false) {
    throw new SyntaxError(`Prefix "${prefix}" dose not match pattern!`);
  }

  newRoute.prefix(prefix);

  return newRoute;
}

function combineRoutes({ appInstance, routes = [], middlewares = [] }) {
  if (!appInstance) {
    throw new Error('Application instance is required!');
  }

  if (routes.length < 0) {
    throw new Error('Combiner requires at least one route!');
  }

  if (middlewares.length > 0) {
    appInstance.use(...middlewares);
  }

  routes.map((route) => {
    return appInstance.use(route.routes());
  });
}

exports.createRoutes = createRoutes;
exports.combineRoutes = combineRoutes;
