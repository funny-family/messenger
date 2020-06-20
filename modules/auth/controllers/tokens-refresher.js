const jwt = require('jsonwebtoken');
const config = require('config');
const createToken = require('./tokens-creator');
const BlackToken = require('../models/BlackToken');
const User = require('../../user/models/User');

module.exports = async ctx => {
  const accessToken = ctx.headers['x-access-token'] ||
                      ctx.query.access_token ||
                      ctx.cookies.get('x-access-token') ||
                      ctx.body && ctx.body.access_token;

  const refreshToken = ctx.headers['x-refresh-token'] ||
                      ctx.query.refresh_token ||
                      ctx.cookies.get('x-refresh-token') ||
                      ctx.body && ctx.body.refresh_token;

  if (!accessToken || !refreshToken) return ctx.throw(401, 'No token found!');
  try {
    const decoded = jwt.decode(refreshToken);
    const userId = decoded._id;
    const user = await User.findOne({ _id: userId }).lean().exec();
    const createNewToken = createToken(user);
    const cookiesOptions = {
      signed: true,
      secure: false,
      httpOnly: true
    };

    if (!accessToken || !refreshToken) return ctx.throw(401, 'No token!');
    if (!user) return ctx.throw(500, 'Invalid token!');

    ctx.cookies.set('x-access-token', createNewToken.access_token, {
      ...cookiesOptions,
      expires: 1
    });
    ctx.cookies.set('x-refresh-token', createNewToken.refresh_token, {
      ...cookiesOptions,
      expires: 1
    });

    await Promise.all([accessToken, refreshToken].map(token => {
      const verifyOptions = {
        algorithm: [config.jsonwebtoken.algorithm],
        ignoreExpiration: true
      };
      const expires = jwt.verify(token, config.secretOrKey, verifyOptions).exp;
      const blackToken = new BlackToken({
        token,
        expires: expires * 1000
      });
      return blackToken.save();
    }));
  } catch (err) {
    ctx.cookies.set('x-access-token', null);
    ctx.cookies.set('x-refresh-token', null);
    return ctx.throw(401, 'Refresh token validation error!');
  }
};