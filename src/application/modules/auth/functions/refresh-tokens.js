const config = require('config');

const { UserQuery } = require('@/infrastructure/database/queries/User');
const { BlackTokenQuery } = require('@/infrastructure/database/queries/BlackToken');

const { createAuthTokens } = require('./create-auth-tokens');
const { setAuthCookies } = require('./set-auth-сookies');
const { clearAuthCookies } = require('./clear-auth-cookies');
const { decodeToken } = require('./decode-token');

exports.refreshTokens = async (ctx) => {
  const access_token = config.authData.findToken(
    ctx,
    config.authData.accessTokenCookieName,
    config.authData.accessTokenName
  );

  const refresh_token = config.authData.findToken(
    ctx,
    config.authData.refreshTokenCookieName,
    config.authData.refreshTokenName
  );

  if (!access_token || !refresh_token) {
    ctx.status = 400;
    return ctx.throw(ctx.status, 'No token found!');
  }

  try {
    const decodedRefreshToken = decodeToken(refresh_token);
    const id = decodedRefreshToken._id;
    const userFromDecodedToken = await UserQuery.findId(id);
    const newTokens = createAuthTokens(userFromDecodedToken);

    if (!userFromDecodedToken) {
      ctx.status = 401;
      return ctx.throw(ctx.status, 'Invalid token!');
    }

    setAuthCookies(ctx, newTokens);

    await Promise.all([
      BlackTokenQuery.save(access_token),
      BlackTokenQuery.save(refresh_token)
    ]);
  } catch (error) {
    clearAuthCookies(ctx);

    ctx.status = 401;
    return ctx.throw(ctx.status, 'Refresh token validation error!');
  }
};
