const LocalStrategy = require('passport-local').Strategy;
const createError = require('http-errors');

const UserList = require('@/db-requests/user');

const emailPath = 'email';
const passwordPath = 'password';

module.exports = new LocalStrategy({
  usernameField: emailPath,
  passwordField: passwordPath,
  session: false
}, async function (email, password, done) {
  try {
    const user = await UserList.findEmail(email);

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
      throw done(createError(401, 'Unauthorized', errorObject));
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
      throw done(createError(401, 'Unauthorized', errorObject));
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});
