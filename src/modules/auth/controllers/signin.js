const { createTokensForUser } = require('./functions/create-tokens-for-user');
const { setCookies } = require('./functions/set-сookies');

exports.signin = async function (ctx) {
  const tokens = createTokensForUser(ctx.state.user);
  await setCookies(ctx, tokens);
  ctx.type = 'json';
  ctx.body = tokens;
};
