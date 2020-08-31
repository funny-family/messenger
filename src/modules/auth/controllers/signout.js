const BlackToken = require('../../../models/BlackToken');
const { clearCookies } = require('./functions/clear-cookies');

exports.single = async ctx => { // single signout
  const access_token = ctx.headers['x-access-token'] ||
                      ctx.query.access_token ||
                      ctx.cookies.get('x-access-token') ||
                      ctx.body && ctx.body.access_token;

  const refresh_token = ctx.headers['x-refresh-token'] ||
                      ctx.query.refresh_token ||
                      ctx.cookies.get('x-refresh-token') ||
                      ctx.body && ctx.body.refresh_token;

  if (!access_token || !refresh_token) return ctx.throw(400);

  console.log('access_token:', access_token);
  console.log('refresh_token:', refresh_token);

  const blackAccessToken = new BlackToken({
    token: access_token
  });
  const blackRefreshToken = new BlackToken({
    token: refresh_token
  });

  await Promise.all([
    blackAccessToken.save(),
    blackRefreshToken.save()
  ]);
  clearCookies(ctx);
  ctx.status = 200;
};
