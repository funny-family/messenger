const config = require('config');
const JWTStrategy = require('passport-jwt').Strategy;

const UsersList = require('../models/User');
const BlackTokensList = require('../models/BlackToken');

const options = {
  passReqToCallback: true,
  ignoreExpiration: false,
  secretOrKey: config.secretOrKey,
  jwtFromRequest: request => {
    return request.headers['x-access-token'] ||
          request.query.access_token ||
          request.cookies.get('x-access-token') ||
          request.body && request.body.access_token;
  }
};

module.exports = new JWTStrategy(options, async function (request, payload, done) {
  const token = request.headers['x-access-token'] ||
                request.query.access_token ||
                request.cookies.get('x-access-token') ||
                request.body && request.body.access_token;

  const deniedToken = await BlackTokensList.findOne({ token }).lean().exec();
  const userId = payload._id;
  const user = await UsersList.findOne({ _id: userId });

  if (deniedToken) return done(null, false, { message: 'Token is blacklisted!' });

  if (!user) return done(null, false, { message: 'User not found!' });

  return done(null, user);
});
