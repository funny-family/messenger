const Router = require('koa-router');

const bodyParser = require('../../middlewares/body-parser');
const passport = require('../../middlewares/passport');

const { signup } = require('./controllers/signup');
const { signin } = require('./controllers/signin');
const signout = require('./controllers/signout');

const auth = new Router({
  prefix: '/auth'
});

auth.post(
  '/signup',
  bodyParser,
  signup
);

auth.post(
  '/signin',
  bodyParser,
  passport.authenticate('local', { session: false, failWithError: true }),
  signin
);

auth.post(
  '/signout',
  bodyParser,
  passport.authenticate('jwt', { session: false, failWithError: true }),
  signout.single
);

module.exports = [auth];
