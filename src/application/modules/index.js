const { RouterFactory } = require('../framework/core');

module.exports = RouterFactory.connectSome([
  require('./auth/auth.module'),
  require('./user/user.module')
]);
