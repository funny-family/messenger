const passport = require('@/application/middlewares/local/passport');

const { combineRoutes } = require('@core/router');

const routes = require('./routes');

module.exports = (app) => combineRoutes({
  appInstance: app,
  routes,
  middlewares: [
    passport.initialize()
  ]
});
