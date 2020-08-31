exports.setCookies = function (ctx, tokens) {
  const cookiesOptions = {
    signed: true,
    secure: false,
    httpOnly: true
  };

  ctx.cookies.set('x-access-token', tokens.access_token, {
    ...cookiesOptions,
    expires: new Date(tokens.access_token_expiration_date)
  });

  ctx.cookies.set('x-refresh-token', tokens.refresh_token, {
    ...cookiesOptions,
    expires: new Date(tokens.refresh_token_expiration_date)
  });
};
