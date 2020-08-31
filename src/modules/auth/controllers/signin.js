const createTokens = require('./functions/tokens-creator');
const setCookiesAndTokens = require('./functions/cookies-setter');

module.exports = async ctx => {
  const tokens = createTokens(ctx.state.user);
  await setCookiesAndTokens(ctx, tokens);
  ctx.type = 'json';
  ctx.body = tokens;
};
