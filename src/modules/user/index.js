const passport = require('@/middlewares/passport');
const routes = require('./routes');

module.exports = (app) => {
  app.use(passport.initialize());

  routes.map((route) => {
    return app.use(route.routes());
  });
};
