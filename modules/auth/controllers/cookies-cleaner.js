module.exports = ctx => {
  ctx.cookies.set('x-access-token', null);
  ctx.cookies.set('x-refresh-token', null);
  ctx.cookies.set('x-access-token.sig', null);
  ctx.cookies.set('x-refresh-token.sig', null);
};