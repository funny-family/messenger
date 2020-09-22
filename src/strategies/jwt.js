const config = require('config');
const JWTStrategy = require('passport-jwt').Strategy;

const UserList = require('@/db-requests/user');
const BlackTokenList = require('@/db-requests/black-token');

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
  const access_token = request.headers['x-access-token'] ||
                request.query.access_token ||
                request.cookies.get('x-access-token') ||
                request.body && request.body.access_token;

  const deniedToken = await BlackTokenList.findToken(access_token);
  const userId = payload._id;
  const user = await UserList.findIdAsDocument(userId);

  if (deniedToken) return done(null, false, { message: 'Token is blacklisted!' });

  if (!user) return done(null, false, { message: 'User not found!' });

  return done(null, user);
});
