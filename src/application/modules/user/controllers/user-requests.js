const { getUseragentInfo } = require('../functions/get-useragent-info');

exports.getAuthenticatedUserInfo = async (ctx) => {
  ctx.type = 'json';
  ctx.body = ctx.state.user;
};

exports.getUserAgentInfo = async (ctx) => {
  const userAgentObject = await getUseragentInfo(ctx);

  const userGeolocationInfo = await ctx.get('http://ip-api.com/json', null, {
    'User-Agent': 'koa-http-request'
  });

  const userInfo = {
    userGeolocationInfo,
    userAgentObject
  };

  ctx.type = 'json';
  ctx.body = {
    userInfo
  };
};
