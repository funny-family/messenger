const Router = class {
  constructor(controllerFunction) {
    this.controllerFunction = controllerFunction;
  }

  static createRoute() {}
};

exports.Router = Router;

// https://stackoverflow.com/questions/7764536/pass-object-to-javascript-function

// exports.combineRoutes = (app, routes, middlewares) => {
//   // app.use(passport.initialize());
//   routes.forEach((route) => {
//     app.use(route.routes());
//   });
// };

exports.combineRoutes = (args) => { // applicationInstance, routes, middlewares
  args.middlewares.forEach((middleware) => {
    args.app.use(middleware);
  });

  args.routes.forEach((route) => {
    args.app.use(route.routes());
  });
};

// combineRoutes({
//   app,
//   routes,
//   middlewares: [
//     app.use(passport.initialize());
//   ]
// });
