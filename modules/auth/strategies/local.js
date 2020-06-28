const LocalStrategy = require('passport-local').Strategy;
const User = require('../../user/models/User');

const emailPath = 'email';
const passwordPath = 'password';

module.exports = new LocalStrategy({
  usernameField: emailPath,
  passwordField: passwordPath,
  session: false
}, async function (email, password, done) {
  try {
    const user = await User.findOne({ email: String(email) });

    if (!user) {
      const errorObject = {
        errors: {
          email: {
            properties: {
              path: emailPath,
              message: 'User not found!'
            }
          }
        }
      };
      throw errorObject;
    }
    if (!user.checkPassword(password)) {
      const errorObject = {
        errors: {
          password: {
            properties: {
              path: passwordPath,
              message: 'Incorrect password!'
            }
          }
        }
      };
      throw errorObject;
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});
