exports.getAuthenticatedUserInfo = async ctx => {
  ctx.body = ctx.state.user;
};

exports.checkIsUserAuthenticated = async ctx => {
  if (ctx.status === 200) {
    ctx.body = 'Access is allowed!';
  } else {
    ctx.body = 'Access is denied!';
  }
};

exports.getUserAgentInfo = async ctx => {
  const userInfo = require('util').inspect(ctx.userAgent);
  ctx.body = userInfo;
};
