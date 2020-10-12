const KoaRouter = require('koa-router');

const newRoute = new KoaRouter();

// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Error // to set errors!

const Router = class {
  static createRoute({ method, prefix = '', path, middlewares, callback }) {
    newRoute.prefix(prefix);

    // middlewares = middlewares.map((middleware) => {
    //   return middleware;
    // });

    const passMiddleware = () => {
      return {
        ...middlewares
      };
    };

    newRoute[method](
      path,
      passMiddleware,
      callback
    );
    // return newRoute[method](
    //   path,
    //   middlewares,
    //   callback
    // );

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
