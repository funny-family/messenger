const User = require('@/models/User');

exports.findEmail = function (email) {
  return User.findOne({ email: String(email) });
};
