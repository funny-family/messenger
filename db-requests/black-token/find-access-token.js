const BlackToken = require('@/models/BlackToken');

exports.findAccessToken = async function (access_token) {
  await BlackToken.findOne({ access_token }).lean().exec();
};
