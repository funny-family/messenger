const { RouterFactory } = require('../framework/core');

module.exports = RouterFactory.merge([
  require('./auth/auth.module'),
  require('./user/user.module')
]);
