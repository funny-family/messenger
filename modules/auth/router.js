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
  passport.authenticate('local', { session: false }),
  authenticator.signin
);

auth.post(
  '/signout',
  bodyParser,
  passport.authenticate('jwt', { session: false }),
  authenticator.signout
);

auth.get('/un', bodyParser, passport.authenticate('jwt', { session: false }), async ctx => {
  ctx.body = ctx.state.user;
});

module.exports = [auth];
