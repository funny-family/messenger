exports.getAuthenticatedUserInfo = async ctx => {
  ctx.type = 'json';
  ctx.body = ctx.state.user;
};

exports.checkIsUserAuthenticated = async ctx => {
  ctx.body = 'Access is allowed!';
};

exports.getUserAgentInfo = async ctx => {
  ctx.type = 'json';
  const userInfo = require('util').inspect(ctx.userAgent);
  ctx.body = userInfo;
};
