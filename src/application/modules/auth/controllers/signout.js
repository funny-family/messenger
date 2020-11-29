const config = require('config');

const { BlackTokenQuery } = require('@/infrastructure/database/queries/BlackToken');

const { clearAuthCookies } = require('../functions/clear-auth-cookies');

exports.single = async (ctx) => { // single signout
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

  await Promise.all([
    BlackTokenQuery.save(access_token),
    BlackTokenQuery.save(refresh_token)
  ]);

  clearAuthCookies(ctx);

  ctx.status = 200;
};

exports.all = async () => {
  throw new Error('Sign out sign dose not work!');
};
