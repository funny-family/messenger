const { refreshTokens } = require('../functions/refresh-tokens');

module.exports = async function (ctx) {
  await refreshTokens(ctx);

  ctx.status = 200;
};
