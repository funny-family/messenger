exports.clearAuthCookies = function (ctx) {
  ctx.cookies.set('x-access-token', null);
  ctx.cookies.set('x-access-token.sig', null);

  ctx.cookies.set('x-refresh-token', null);
  ctx.cookies.set('x-refresh-token.sig', null);

  ctx.cookies.set('logged-in', null);
  ctx.cookies.set('logged-in.sig', null);
};
