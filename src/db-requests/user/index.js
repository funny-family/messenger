const User = require('@/models/User');

exports.findId = function (id) {
  return User.findOne({ _id: id }).lean().exec();
};

exports.findIdAsDocument = function (id) {
  return User.findOne({ _id: id });
};

exports.findEmail = function (email) {
  return User.findOne({ email: String(email) });
};
