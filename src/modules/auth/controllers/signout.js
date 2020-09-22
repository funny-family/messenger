const BlackTokenList = require('@/db-requests/black-token');

const { clearCookies } = require('./functions/clear-cookies');

exports.single = async function (ctx) { // single signout
  const access_token = ctx.headers['x-access-token'] ||
                      ctx.query.access_token ||
                      ctx.cookies.get('x-access-token') ||
                      ctx.body && ctx.body.access_token;

  const refresh_token = ctx.headers['x-refresh-token'] ||
                      ctx.query.refresh_token ||
                      ctx.cookies.get('x-refresh-token') ||
                      ctx.body && ctx.body.refresh_token;

  if (!access_token || !refresh_token) return ctx.throw(400);

  await Promise.all([
    BlackTokenList.addTokenAndSave(access_token),
    BlackTokenList.addTokenAndSave(refresh_token)
  ]);

  clearCookies(ctx);

  ctx.status = 200;
};
