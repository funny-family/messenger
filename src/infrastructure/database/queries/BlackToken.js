const BlackToken = require('../models/BlackToken');

class BlackTokenQuery {
  static findToken(token) {
    return BlackToken.findOne({ token }).lean().exec();
  }

  static async save(token) {
    try {
      const blackToken = new BlackToken({ token });
      await blackToken.save();
    } catch (error) {
      return error;
    }
  }
}

exports.BlackTokenQuery = BlackTokenQuery;
