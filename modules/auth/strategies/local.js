const LocalStrategy = require('passport-local').Strategy;
const User = require('../../user/models/User');

module.exports = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
}, async function (email, password, done) {
  try {
    const user = await User.findOne({ email: String(email) });

    if (!user) {
      return done(null, false, { message: 'User not found!' });
    }
    if (!user.checkPassword(password)) {
      return done(null, false, { message: 'Incorrect password!' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});
