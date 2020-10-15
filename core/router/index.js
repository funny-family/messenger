const KoaRouter = require('koa-router');

// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Error // to set errors!
// https://stackoverflow.com/questions/7764536/pass-object-to-javascript-function

// static createRoute({ method = '', prefix = '', path = '', middlewares = [], callback }) {
//   const checkMethodName = (methodName) => {
//     return ['get', 'post', 'put', 'del'].indexOf(methodName) !== -1;
//   };

//   if (typeof method !== 'string') {
//     throw new TypeError(`Route method should be string type instead of ${typeof method}!`);
//   } else if (checkMethodName(method) === false) {
//     throw new SyntaxError(`Invalid method name ${method}!`);
//   }

//   if (typeof prefix !== 'string') {
//     throw new TypeError(`Prefix should be string type instead of ${typeof prefix}!`);
//   }

//   if (typeof path !== 'string') {
//     throw new TypeError(`Path should be string type instead of ${typeof path}!`);
//   }

//   console.log(newRoute);

//   newRoute.prefix(prefix);

//   newRoute[method](
//     path,
//     ...middlewares,
//     callback
//   );

//   return newRoute;

//   // createRoute({ // example of usage
//   //   prefix: 'somePrefix',
//   //   path: '/some-path',
//   //   middlewares: [
//   //     passport.authenticate('jwt', { session: false, failWithError: true })
//   //   ],
//   //   callback: Controller
//   // });
// }

exports.createRoutes = (routes) => {
  // console.log(routes);
  const newRoute = new KoaRouter();

  let prefixString = '';
  // const newRoutes = [];
  // const modifiedRoutes = [];
  // console.log('newRoute', newRoute);

  // console.log('all routes', routes);
  routes.forEach(({ method = '', prefix, path = '', middlewares, callback }) => {
    // console.log('route method:', route.method);
    // console.log('route prefix:', route.prefix);
    // console.log('route path:', route.path);
    // console.log('route middlewares:', route.middlewares);
    // console.log('route callback:', route.callback, '\n');

    // const fullPath = prefix + path;
    prefixString = prefix;
    // newRoute.prefix(prefix);

    // modifiedRoutes.push(
    //   );
    newRoute[method](path, ...middlewares, callback);
  });
  newRoute.prefix(prefixString);
  // console.log(newRoute);

  // console.log(newRoute);
  // console.log('newRoute:', newRoute);
  // return newRoutes.push(newRoute);

  // return [
  //   newRoute.opts,
  //   newRoute.methods,
  //   newRoute.stack
  // ];
  return newRoute;
};

exports.combineRoutes = ({ appInstance, routes = [], middlewares = [] }) => {
  console.log(routes);
  // const modifiedRoutes = this.createRoutes(routes);
  // console.log('modifiedRoutes:', modifiedRoutes);
  // const modifiedRoutes = Array.from(routes);
  // const newRoute = new KoaRouter();
  // console.log(newRoute);
  // console.log('Object routes:', routes);

  // for (const route of routes) {
  //   // console.log(route);
  //   const fullPath = route.prefix + route.path;

  //   // console.log('newRoute:', newRoute);
  //   newRoute[route.method](
  //     fullPath,
  //     ...route.middlewares,
  //     route.callback
  //   );
  // }

  // console.log('routes:', routes);
  // console.log('routes is array:', Array.isArray(modifiedRoutes));

  if (!appInstance) {
    throw new Error('Required to set application instance!');
  }

  if (routes.length < 0) {
    throw new Error('Combiner requires at least one route!');
  }

  if (middlewares.length > 0) {
    appInstance.use(...middlewares);
  }

  // modifiedRoutes.push(routes);

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
};
