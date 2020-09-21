const BlackToken = require('@/models/BlackToken');

exports.addTokenToBlacklist = async function (token) {
  try {
    const blackToken = new BlackToken({ token });
    await blackToken.save();
  } catch (error) {
    return error;
  }
};
