const Router = require('koa-router');
const bodyParser = require('../../middlewares/body-parser');
const passport = require('../auth/middlewares/passport');
const authorizator = require('./controllers/authorizator');

const user = new Router({
  prefix: '/user'
});

user.get(
  '/get-user',
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

module.exports = [user];