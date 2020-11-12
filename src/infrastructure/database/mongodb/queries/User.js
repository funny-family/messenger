const User = require('../models/User');

class UserQuery {
  static findId(id) {
    return User.findOne({ _id: id }).lean().exec();
  }

  static findIdAsDocument(id) {
    return User.findOne({ _id: id });
  }

  static findEmail(email) {
    return User.findOne({ email: String(email) });
  }
}

exports.UserQuery = UserQuery;
