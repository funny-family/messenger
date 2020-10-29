const bodyParser = require('@/middlewares/local/body-parser');
const passport = require('@/middlewares/local/passport');

const { signup } = require('./controllers/signup');
const { signin } = require('./controllers/signin');
const signout = require('./controllers/signout');
const { checkAuth } = require('./controllers/check-auth');
const { refreshAuth } = require('./controllers/refresh-auth');

const { createRoutes } = require('../../../core/router');

const apiV1Routes = [
  {
    method: 'post',
    path: '/signup',
    middlewares: [
      bodyParser
    ],
    callback: signup
  },
  {
    method: 'post',
    path: '/signin',
    middlewares: [
      bodyParser,
      passport.authenticate('local', { session: false, failWithError: true })
    ],
    callback: signin
  },
  {
    method: 'post',
    path: '/signout',
    middlewares: [
      passport.authenticate('jwt', { session: false, failWithError: true })
    ],
    callback: signout.single
  },
  {
    method: 'post',
    path: '/check-auth',
    middlewares: [
      passport.authenticate('jwt', { session: false, failWithError: true })
    ],
    callback: checkAuth
  },
  {
    method: 'post',
    path: '/refresh-auth',
    callback: refreshAuth
  }
];

module.exports = [
  createRoutes(apiV1Routes, '/api/v1/auth')
];

