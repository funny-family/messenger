const LocalStrategy = require('passport-local').Strategy;
const User = require('../../user/models/User');

const emailPath = 'email';
const passwordPath = 'password';
const errorObject = {
  errors: {
    email: {
      properties: {
        path: '',
        message: ''
      }
    }
  }
};

module.exports = new LocalStrategy({
  usernameField: emailPath,
  passwordField: passwordPath,
  session: false
}, async function (email, password, done) {
  try {
    const user = await User.findOne({ email: String(email) });

    if (!user) {
      errorObject.errors.email.properties.message = 'User not found!';
      errorObject.errors.email.properties.path = emailPath;
      throw errorObject;
    }
    if (!user.checkPassword(password)) {
      errorObject.errors.email.properties.message = 'Incorrect password!';
      errorObject.errors.email.properties.path = passwordPath;
      throw errorObject;
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});
