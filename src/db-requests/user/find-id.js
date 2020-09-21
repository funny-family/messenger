const User = require('@/models/User');

exports.findId = function (userId) {
  return User.findOne({ _id: userId }).lean().exec();
};
