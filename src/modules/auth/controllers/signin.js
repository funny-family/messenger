const { createTokens } = require('./functions/create-tokens');
const { setCookies } = require('./functions/set-сookies');

module.exports = async ctx => {
  const tokens = createTokens(ctx.state.user);
  await setCookies(ctx, tokens);
  ctx.type = 'json';
  ctx.body = tokens;
};
