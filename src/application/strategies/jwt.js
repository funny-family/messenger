const config = require('config');
const JWTStrategy = require('passport-jwt').Strategy;

const { UserQuery } = require('@/infrastructure/database/mongodb/queries/User');
const { BlackTokenQuery } = require('@/infrastructure/database/mongodb/queries/BlackToken');

const options = {
  passReqToCallback: true,
  ignoreExpiration: false,
  secretOrKey: config.app.secretOrKey,
  jwtFromRequest: (ctx) => { // ctx contain request
    /*
      priority
      1 - query
      2 - body
      3 - headers
      4 - cookies
    */
    return ctx.headers['x-access-token'] ||
          ctx.query.access_token ||
          ctx.cookies.get('x-access-token') ||
          ctx.body && ctx.body.access_token;
  }
};

module.exports = new JWTStrategy(options, async function (ctx, payload, done) { // ctx contain request
  const access_token = ctx.headers['x-access-token'] ||
                ctx.query.access_token ||
                ctx.cookies.get('x-access-token') ||
                ctx.body && ctx.body.access_token;

  const deniedToken = await BlackTokenQuery.findToken(access_token);
  const userId = payload._id;
  const user = await UserQuery.findIdAsDocument(userId);

  if (deniedToken) return done(null, false, { message: 'Token is blacklisted!' });

  if (!user) return done(null, false, { message: 'User not found!' });

  return done(null, user);
});
