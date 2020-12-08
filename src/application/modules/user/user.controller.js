const passport = require('@/application/middlewares/local/passport');
const { RouterFactory } = require('../../framework/core');
const userRequest = require('./services/user-requests');

const apiV1Routes = [
  {
    method: 'get',
    path: '/me',
    middlewares: [
      passport.authenticate('jwt', { session: false })
    ],
    callback: userRequest.getAuthenticatedUserInfo
  },
  {
    method: 'get',
    path: '/get-user-info',
    middlewares: [
      // passport.authenticate('jwt', { session: false }),
    ],
    callback: userRequest.getUserAgentInfo
  }
];

module.exports = RouterFactory.create(apiV1Routes, '/api/v1/user');
