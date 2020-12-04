const KoaRouter = require('koa-router');

exports.createRoutes = (routes, prefix = '') => {
  // const routePathRegex = /^\/(.*)\/(?:([^\/]+?))\/?$/;
  const routePathRegex = /^\/(.*)(?:([^\/]+?))\/?$/;

  const newRoute = new KoaRouter();

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
};

// exports.combineRoutes = ({ appInstance, routes = [], middlewares = [] }) => {
//   if (!appInstance) {
//     throw new Error('Application instance is required!');
//   }

//   if (routes.length < 0) {
//     throw new Error('Combiner requires at least one route!');
//   }

//   if (middlewares.length > 0) {
//     appInstance.use(...middlewares);
//   }

//   for (const route of routes) {
//     // console.log('route.routes():', route.routes());
//     return appInstance.use(route.routes());
//   }
// };

exports.initRouter = ({ appInstance, routes = [], middlewares = [], methodsOptions = {} }) => {
  if (!appInstance) {
    throw new Error('Application instance is required!');
  }

  if (routes.length < 0) {
    throw new Error('Combiner requires at least one route!');
  }

  if (middlewares.length > 0) {
    appInstance.use(...middlewares);
  }

  for (const route of routes) {
    appInstance.use(route.routes());
    appInstance.use(route.allowedMethods(methodsOptions));
  }
};

function declareRouter({ appInstance, routers = [] }) {
  console.log(appInstance);
  for (const router of routers) {
    console.log('router:', router);
    require(router)(appInstance);
  }
}

exports.declareRouter = declareRouter;

// const callerPath = require('caller-path');

// exports.declareRouter = ({ appInstance, pathsToModules = [] }) => {
//   console.log('appInstance:', appInstance);

//   console.log('callerPath():', callerPath());
//   console.log('process.cwd():', process.cwd());

//   if (Array.isArray(pathsToModules) === false) {
//     throw new TypeError('Modules should be an array!');
//   }

//   if (pathsToModules.length > 0) {
//     for (const modulePath of pathsToModules) {
//       console.log('modulePath:', modulePath);
//       return (modulePath)(appInstance);
//       // return require('../../src/application/modules');
//     }

//     // -> return require('some kind of path to module')(appInstance);

//     // return {
//     //   ...pathsToModules
//     // };
//   }
// };
