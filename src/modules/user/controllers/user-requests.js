const useragent = require('express-useragent');
const { useragentInfoToObject } = require('./functions/useragent-info-to-object');

exports.getAuthenticatedUserInfo = async ctx => {
  ctx.type = 'json';
  ctx.body = ctx.state.user;
};

exports.checkIsUserAuthenticated = async ctx => {
  ctx.body = 'Access is allowed!';
};

exports.getUserAgentInfo = async ctx => {
  // is+\w{0,} (isiPhone, isMobileNative ....)
  // is+\w{0,}.\s(false|true) (isMobileNative: false, isTablet: false ....)
  useragentInfoToObject(ctx);
  const userAgentInfo1 = await require('util').inspect(ctx.userAgent);
  // console.log(userAgentInfo1);
  const userAgentInfo = useragent.parse(ctx.headers['user-agent']);

  const userGeolocationInfo = await ctx.get('http://ip-api.com/json', null, {
    'User-Agent': 'koa-http-request'
  });

  const userInfo = {
    userAgentInfo1,
    userAgentInfo,
    userGeolocationInfo
  };

  ctx.type = 'json';
  ctx.body = userInfo;
};
