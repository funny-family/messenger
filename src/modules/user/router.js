const Router = require('koa-router');

const bodyParser = require('@/middlewares/body-parser');
const passport = require('@/middlewares/passport');

const authorizator = require('./controllers/authorizator');

const apiV1 = new Router({
  prefix: '/api/v1/user'
});

apiV1.get(
  '/me',
  bodyParser,
  passport.authenticate('jwt', { session: false }),
  authorizator.getAuthenticatedUserInfo
);

apiV1.get(
  '/check-auth',
  bodyParser,
  passport.authenticate('jwt', { session: false }),
  authorizator.checkIsUserAuthenticated
);

apiV1.get(
  '/get-info',
  bodyParser,
  passport.authenticate('jwt', { session: false }),
  authorizator.getUserAgentInfo
);

module.exports = [apiV1];
