const KoaRouter = require('koa-router');

const newRoute = new KoaRouter();

// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Error // to set errors!

const Router = class {
  static createRoute({ method = '', prefix = '', path = '', middlewares, callback }) {
    const checkMethodName = (methodName) => {
      return ['get', 'post', 'put', 'del'].indexOf(methodName) !== -1;
    };

    if (typeof method !== 'string') {
      throw new TypeError(`Route method should be string type insted of ${typeof method}!`);
    } else if (checkMethodName(method) === false) {
      throw new SyntaxError(`Invalid method name ${method}!`);
    }

    if (typeof prefix !== 'string') {
      throw new TypeError(`Prefix should be string type insted of ${typeof prefix}!`);
    }

    if (typeof path !== 'string') {
      throw new TypeError(`Path should be string type insted of ${typeof path}!`);
    }

    newRoute.prefix(prefix);

    newRoute[method](
      path,
      ...middlewares,
      callback
    );

    return newRoute;

    // createRoute({ // example of usage
    //   prefix: 'somePrefix',
    //   path: '/some-path',
    //   middlewares: [
    //     passport.authenticate('jwt', { session: false, failWithError: true })
    //   ],
    //   callback: Controller
    // });
  }

  static combineRoutes({ appInstance, routes, middlewares = [] }) {
    if (!appInstance) {
      throw new Error('Required to set application instance!');
    }

    if (!routes) {
      throw new Error('Combiner requires at least one route!');
    }

    if (middlewares.length > 0) {
      middlewares.map((middleware) => {
        return appInstance.use(middleware);
      });
    }

    routes.map((route) => {
      return appInstance.use(route.routes());
    });

    // combineRoutes({              // example of usage
    //   appInstance: app,          // required!
    //   routes,                    // required at least one route!
    //   middlewares: [             // not necessary
    //     passport.initialize()
    //   ]
    // });
  }
};

module.exports = {
  createRoute: Router.createRoute,
  combineRoutes: Router.combineRoutes,
  Router
};

// https://stackoverflow.com/questions/7764536/pass-object-to-javascript-function

// exports.combineRoutes = (args) => { // appInstance, routes, middlewares
//   args.middlewares.map((middleware) => {
//     return args.appInstance.use(middleware);
//   });

//   args.routes.map((route) => {
//     return args.appInstance.use(route.routes());
//   });
// };
