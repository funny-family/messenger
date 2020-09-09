exports.getAuthenticatedUserInfo = async ctx => {
  ctx.type = 'json';
  ctx.body = ctx.state.user;
};

exports.checkIsUserAuthenticated = async ctx => {
  ctx.type = 'json';
  if (ctx.status === 200) {
    ctx.body = 'Access is allowed!';
  } else {
    ctx.body = 'Access is denied!';
  }
};

exports.getUserAgentInfo = async ctx => {
  ctx.type = 'json';
  const userInfo = require('util').inspect(ctx.userAgent);
  ctx.body = userInfo;
};
