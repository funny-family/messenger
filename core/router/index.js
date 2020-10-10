const KoaRouter = require('koa-router');

// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Error // to set errors!

const Router = class {
  static createRoute({ method, prefix, path, middlewares, callback }) { // { method, prefix, path, middlewares, callback }
    const router = new KoaRouter();

    router.prefix(prefix);

    // middlewares = middlewares.map((middleware) => {
    //   return middleware;
    // });

    router[method](path, middlewares, callback);
    // return router[method](
    //   path,
    //   middlewares,
    //   callback
    // );

    return router;

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

    middlewares.map((middleware) => {
      return appInstance.use(middleware);
    });

    if (middlewares.length > 0) {
      routes.map((route) => {
        return appInstance.use(route.routes());
      });
    }

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
