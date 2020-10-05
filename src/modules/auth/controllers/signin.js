const { createAuthTokens } = require('./functions/create-auth-tokens');
const { setAuthCookies } = require('./functions/set-auth-сookies');

exports.signin = async function (ctx) {
  const tokens = createAuthTokens(ctx.state.user);
  await setAuthCookies(ctx, tokens);

  ctx.type = 'json';
  ctx.body = tokens;
};
