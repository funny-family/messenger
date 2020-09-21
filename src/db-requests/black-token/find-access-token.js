const BlackToken = require('@/models/BlackToken');

exports.findAccessToken = function (access_token) {
  return BlackToken.findOne({ access_token }).lean().exec();
};
