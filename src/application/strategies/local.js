const LocalStrategy = require('passport-local').Strategy;

const { UserQuery } = require('@/infrastructure/database/queries/User');

class ErrorObject {
  constructor(errorField, errorMessage) {
    this.errorField = errorField;
    this.errorMessage = errorMessage;

    return {
      errors: {
        [this.errorField]: {
          properties: {
            path: this.errorField,
            message: this.errorMessage
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
}, async (email, password, done) => {
  try {
    const user = await UserQuery.findEmail(email);

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
