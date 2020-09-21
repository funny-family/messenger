const { createTokensForUser } = require('./functions/create-tokens-for-user');
const { setAuthCookies } = require('./functions/set-auth-сookies');

exports.signin = async function (ctx) {
  const tokens = createTokensForUser(ctx.state.user);
  await setAuthCookies(ctx, tokens);

  ctx.type = 'json';
  ctx.body = tokens;
};
