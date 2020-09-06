const Router = require('koa-router');

const bodyParser = require('@/middlewares/body-parser');
const passport = require('@/middlewares/passport');

const authorizator = require('./controllers/authorizator');

const user = new Router({
  prefix: '/user'
});

user.get(
  '/me',
  bodyParser,
  passport.authenticate('jwt', { session: false }),
  authorizator.getAuthenticatedUserInfo
);

user.get(
  '/check-auth',
  bodyParser,
  passport.authenticate('jwt', { session: false }),
  authorizator.checkIsUserAuthenticated
);

user.get(
  '/get-info',
  bodyParser,
  passport.authenticate('jwt', { session: false }),
  authorizator.getUserAgentInfo
);

module.exports = [user];
