// const Router = require('koa-router');

const bodyParser = require('@/middlewares/body-parser');
const passport = require('@/middlewares/passport');

const { signup } = require('./controllers/signup');
const { signin } = require('./controllers/signin');
const signout = require('./controllers/signout');
// const { refreshAuth } = require('./controllers/refresh-auth');
// const { checkAuth } = require('./controllers/check-auth');

const { createRoute } = require('../../../core/router');

const prefix = '/api/v1/auth';

module.exports = [
  createRoute({
    method: 'post',
    prefix,
    path: '/signup',
    middlewares: [
      bodyParser
    ],
    callback: signup
  }),

  createRoute({
    method: 'post',
    prefix,
    path: '/signin',
    middlewares: [
      bodyParser,
      passport.authenticate('local', { session: false, failWithError: true })
    ],
    callback: signin
  }),

  createRoute({
    method: 'post',
    prefix,
    path: '/signout',
    middlewares: [
      bodyParser,
      passport.authenticate('jwt', { session: false, failWithError: true })
    ],
    callback: signout.single
  })
];

// const apiV1 = new Router({
//   prefix: '/api/v1/auth'
// });

// apiV1.post(
//   '/signup',
//   bodyParser,
//   signup
// );

// apiV1.post(
//   '/signin',
//   bodyParser,
//   passport.authenticate('local', { session: false, failWithError: true }),
//   signin
// );

// apiV1.post(
//   '/signout',
//   passport.authenticate('jwt', { session: false, failWithError: true }),
//   signout.single
// );

// apiV1.get(
//   '/check-auth',
//   passport.authenticate('jwt', { session: false, failWithError: true }),
//   checkAuth
// );

// apiV1.post(
//   '/refresh-auth',
//   refreshAuth
// );

// module.exports = [apiV1];
