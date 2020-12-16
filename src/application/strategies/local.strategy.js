const LocalStrategy = require('passport-local').Strategy;

const { UserQuery } = require('@/infrastructure/database/queries/User');

class ErrorObject {
  constructor(field, message) {
    this.field = field;
    this.message = message;

    return {
      errors: {
        [this.field]: {
          properties: {
            path: this.field,
            message: this.message
          }
        }
      }
    };
  }
}

const usernameField = 'email';
const passwordField = 'password';

module.exports = new LocalStrategy({
  usernameField,
  passwordField,
  session: false
}, async (login, password, done) => {
  try {
    const user = await UserQuery.findEmail(login);

    if (!user) {
      return done(null, false, new ErrorObject(usernameField, 'User not found!'));
    }

    if (!user.checkPassword(password)) {
      return done(null, false, new ErrorObject(passwordField, 'Incorrect password!'));
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
});
