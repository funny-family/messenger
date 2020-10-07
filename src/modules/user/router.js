const Router = require('koa-router');

const bodyParser = require('@/middlewares/body-parser');
const passport = require('@/middlewares/passport');

const userRequest = require('./controllers/user-requests');

const apiV1 = new Router({
  prefix: '/api/v1/user'
});

apiV1.get(
  '/me',
  bodyParser,
  passport.authenticate('jwt', { session: false }),
  userRequest.getAuthenticatedUserInfo
);

apiV1.get(
  '/get-user-info',
  bodyParser,
  // passport.authenticate('jwt', { session: false }),
  userRequest.getUserAgentInfo
);

module.exports = [apiV1];
