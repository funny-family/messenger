const User = require('@/models/User');

exports.findId = async function (userId) {
  await User.findOne({ _id: userId }).lean().exec();
};
