const Router = require('koa-router');
const bodyParser = require('../../middlewares/body-parser');
const passport = require('./middlewares/passport');
const authenticator = require('./controllers/authenticator');

const auth = new Router({
  prefix: '/auth'
});

auth.post(
  '/signup',
  bodyParser,
  authenticator.signup
);

auth.post(
  '/signin',
  bodyParser,
  passport.authenticate('local', { session: false, failWithError: true }),
  authenticator.signin
);

auth.post(
  '/signout',
  bodyParser,
  passport.authenticate('jwt', { session: false, failWithError: true }),
  authenticator.signout
);

module.exports = [auth];