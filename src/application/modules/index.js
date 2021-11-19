const { merge } = require('../framework/core');

module.exports = merge([
  require('./auth/auth.module'),
  require('./user/user.module')
]);
