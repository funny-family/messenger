const bodyParser = require('@/application/middlewares/local/body-parser');
const passport = require('@/application/middlewares/local/passport');

const { createRoutes } = require('@core/router');

const apiV1Routes = [
  {
    method: 'post',
    path: '/signup',
    middlewares: [
      bodyParser
    ],
    callback: require('./controllers/signup')
  },
  {
    method: 'post',
    path: '/signin',
    middlewares: [
      bodyParser,
      passport.authenticate('local', { session: false, failWithError: true })
    ],
    callback: require('./controllers/signin')
  },
  {
    method: 'post',
    path: '/signout',
    middlewares: [
      passport.authenticate('jwt', { session: false, failWithError: true })
    ],
    callback: require('./controllers/signout').single
  },
  {
    method: 'post',
    path: '/check-auth',
    middlewares: [
      passport.authenticate('jwt', { session: false, failWithError: true })
    ],
    callback: require('./controllers/check-auth')
  },
  {
    method: 'post',
    path: '/refresh-auth',
    callback: require('./controllers/refresh-auth')
  }
];

module.exports = [
  createRoutes(apiV1Routes, '/api/v1/auth')
];
