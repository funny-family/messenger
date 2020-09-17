const { useragentInfoToObject } = require('./functions/useragent-info-to-object');

exports.getAuthenticatedUserInfo = async ctx => {
  ctx.type = 'json';
  ctx.body = ctx.state.user;
};

exports.checkIsUserAuthenticated = async ctx => {
  ctx.body = 'Access is allowed!';
};

exports.getUserAgentInfo = async ctx => {
  const userAgentString = await require('util').inspect(ctx.userAgent);
  const userAgentObject = useragentInfoToObject(userAgentString);

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
