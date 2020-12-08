const bodyParser = require('@/application/middlewares/local/body-parser');
const passport = require('@/application/middlewares/local/passport');
const { RouterFactory } = require('../../framework/core');

const apiV1Routes = [
  {
    method: 'post',
    path: '/signup',
    middlewares: [
      bodyParser
    ],
    callback: require('./services/signup.service')
  },
  {
    method: 'post',
    path: '/signin',
    middlewares: [
      bodyParser,
      passport.authenticate('local', { session: false, failWithError: true })
    ],
    callback: require('./services/signin.service')
  },
  {
    method: 'post',
    path: '/signout',
    middlewares: [
      passport.authenticate('jwt', { session: false, failWithError: true })
    ],
    callback: require('./services/signout.service').single
  },
  {
    method: 'post',
    path: '/check-auth',
    middlewares: [
      passport.authenticate('jwt', { session: false, failWithError: true })
    ],
    callback: require('./services/check-auth.service')
  },
  {
    method: 'post',
    path: '/refresh-auth',
    callback: require('./services/refresh-auth.service')
  }
];

module.exports = RouterFactory.create(apiV1Routes, '/api/v1/auth');
