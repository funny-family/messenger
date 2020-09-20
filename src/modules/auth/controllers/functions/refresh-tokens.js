const jwt = require('jsonwebtoken');
// const config = require('config');

const BlackToken = require('@/models/BlackToken');
const User = require('@/models/User');

const { createTokensForUser } = require('./create-tokens-for-user');
const { setCookies } = require('./set-сookies');
const { clearCookies } = require('./clear-cookies');

exports.refreshTokens = async ctx => {
  const access_token = ctx.headers['x-access-token'] ||
                      ctx.query.access_token ||
                      ctx.cookies.get('x-access-token') ||
                      ctx.body && ctx.body.access_token;

  const refresh_token = ctx.headers['x-refresh-token'] ||
                      ctx.query.refresh_token ||
                      ctx.cookies.get('x-refresh-token') ||
                      ctx.body && ctx.body.refresh_token;

  if (!access_token || !refresh_token) return ctx.throw(401, 'No token found!');

  try {
    const refreshTokenDecoded = jwt.decode(refresh_token);
    const userId = refreshTokenDecoded._id;
    const user = await User.findOne({ _id: userId }).lean().exec();
    const newTokens = createTokensForUser(user);

    if (!access_token || !refresh_token) return ctx.throw(401, 'No token!');
    if (!user) return ctx.throw(500, 'Invalid token!');

    setCookies(ctx, newTokens);

    await Promise.all([access_token, refresh_token].map((token) => {
      // const verifyOptions = {
      //   algorithm: [config.jsonwebtoken.algorithm],
      //   ignoreExpiration: true
      // };

      // const expires = jwt.verify(token, config.secretOrKey, verifyOptions).exp;
      const blackToken = new BlackToken({
        token
        // expires: expires * 1000
      });

      return blackToken.save();
    }));
  } catch (err) {
    clearCookies(ctx);
    return ctx.throw(401, 'Refresh token validation error!');
  }
};
