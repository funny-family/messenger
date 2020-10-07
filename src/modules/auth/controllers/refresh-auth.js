const { refreshTokens } = require('../functions/refresh-tokens');

exports.refreshAuth = async function (ctx) {
  await refreshTokens(ctx);

  ctx.status = 200;
};
