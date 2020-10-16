const passport = require('@/middlewares/passport');

const routes = require('./routes');

const { combineRoutes } = require('../../../core/router');

module.exports = (app) => combineRoutes({
  appInstance: app,
  routes,
  middlewares: [
    passport.initialize()
  ]
});
