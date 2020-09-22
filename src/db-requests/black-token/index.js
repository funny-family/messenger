const BlackToken = require('@/models/BlackToken');

exports.findToken = function (token) {
  return BlackToken.findOne({ token }).lean().exec();
};

exports.addTokenAndSave = async function (token) {
  try {
    const blackToken = new BlackToken({ token });
    await blackToken.save();
  } catch (err) {
    return err;
  }
};
