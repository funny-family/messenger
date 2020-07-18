exports.getAuthenticatedUserInfo = async ctx => {
  ctx.body = ctx.state.user;
};

exports.checkIsUserAuthenticated = async ctx => {
  ctx.body = 'Access is allowed!';
};
