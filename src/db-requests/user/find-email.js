const User = require('@/models/User');

exports.findEmail = async function (email) {
  await User.findOne({ email: String(email) });
};
