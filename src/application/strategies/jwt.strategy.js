const config = require('config');
const JwtStrategy = require('passport-jwt').Strategy;

const { UserQuery } = require('@/infrastructure/database/queries/User');
const { BlackTokenQuery } = require('@/infrastructure/database/queries/BlackToken');

const options = {
  passReqToCallback: true,
  ignoreExpiration: false,
  secretOrKey: config.app.secretOrKey,
  jwtFromRequest(ctx) {
    return config.authData.findToken(
      ctx,
      config.authData.accessTokenCookieName,
      config.authData.accessTokenName
    );
  }
};

module.exports = new JwtStrategy(options, async (ctx, payload, done) => {
  const access_token = config.authData.findToken(
    ctx,
    config.authData.accessTokenCookieName,
    config.authData.accessTokenName
  );

  const deniedToken = await BlackTokenQuery.findToken(access_token);
  const userId = payload._id;
  const user = await UserQuery.findIdAsDocument(userId);

  if (deniedToken) return done(null, false, { message: 'Token is blacklisted!' });

  if (!user) return done(null, false, { message: 'User not found!' });

  return done(null, user);
});
