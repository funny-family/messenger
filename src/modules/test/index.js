const passport = require('@/middlewares/passport');

const routes = require('./routes');

// console.log('rt1:', Array.isArray(routes));

const { combineRoutes } = require('../../../core/router');

module.exports = (app) => combineRoutes({
  appInstance: app,
  routes,
  middlewares: [
    passport.initialize()
  ]
});
