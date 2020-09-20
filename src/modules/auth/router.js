const Router = require('koa-router');

const bodyParser = require('@/middlewares/body-parser');
const passport = require('@/middlewares/passport');

const { signup } = require('./controllers/signup');
const { signin } = require('./controllers/signin');
const { refreshAuth } = require('./controllers/refresh-auth');
const signout = require('./controllers/signout');

const apiV1 = new Router({
  prefix: '/api/v1/auth'
});

apiV1.post(
  '/signup',
  bodyParser,
  signup
);

apiV1.post(
  '/signin',
  bodyParser,
  passport.authenticate('local', { session: false, failWithError: true }),
  signin
);

apiV1.post(
  '/refresh-auth',
  bodyParser,
  passport.authenticate('jwt', { session: false, failWithError: true }),
  refreshAuth
);

apiV1.post(
  '/signout',
  bodyParser,
  passport.authenticate('jwt', { session: false, failWithError: true }),
  signout.single
);

module.exports = [apiV1];
