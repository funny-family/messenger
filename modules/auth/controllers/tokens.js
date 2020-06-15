const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../user/models/User');
const BlackToken = require('../models/BlackToken');

function createAccessAndRefreshTokens(user) {
  const accessTokenExpiresIn = '60 * 30'; // 60sec * 30 = 30min
  const refreshTokenExpiresIn = '86400 * 30'; // 86400inOneDay * 30 = 30days

  const access_token = jwt.sign({ _id: user._id }, config.secretOrKey, {
    algorithm: config.jsonwebtoken.algorithm,
    expiresIn: accessTokenExpiresIn
  });

  const refresh_token = jwt.sign({ _id: user._id }, config.secretOrKey, {
    algorithm: config.jsonwebtoken.algorithm,
    expiresIn: refreshTokenExpiresIn
  });

  return {
    access_token,
    refresh_token,
    access_token_expires_date: Date.now() * accessTokenExpiresIn * 1000,
    refresh_token_expires_date: Date.now() * refreshTokenExpiresIn * 1000
  };
}

function setCookiesAndTokens(ctx, tokens) {
  const cookiesOptions = {
    signed: true,
    secure: false,
    httpOnly: true
  };

  ctx.cookies.set('x-access-token', tokens.access_token, {
    ...cookiesOptions,
    expires: new Date(tokens.access_token_expires_date)
  });

  ctx.cookies.set('x-refresh-token', tokens.refresh_token, {
    ...cookiesOptions,
    expires: new Date(tokens.refresh_token_expires_date)
  });
}

async function invalidateRefreshToken(ctx) {
  const accessToken = ctx.headers['x-access-token'] ||
                      ctx.query.access_token ||
                      ctx.cookies.get('x-access-token') ||
                      ctx.body && ctx.body.access_token;
  const refreshToken = ctx.headers['x-refresh-token'] ||
                      ctx.query.access_token ||
                      ctx.cookies.get('x-refresh-token') ||
                      ctx.body && ctx.body.access_token;

  if (!accessToken || !refreshToken) return ctx.throw(401, 'No token!');

  const decoded = jwt.decode(refreshToken);
  const userId = decoded._id;

  const user = await User.findOne({ _id: userId }).lean().exec();

  if (!user) return ctx.throw(500, 'Invalid token!');

  await Promise.all([accessToken, refreshToken].map(token => {
    const verifyOptions = {
      algorithm: [config.jsonwebtoken.algorithm],
      ignoreExpiration: true
    };
    const expires = jwt.verify(token, config.secretOrKey, verifyOptions);
    const blackToken = new BlackToken({
      token,
      expiresIn: expires * 1000
    });
    return blackToken.save();
  }));
  const createTokens = createAccessAndRefreshTokens(user);
  setCookiesAndTokens(ctx, createTokens);
  ctx.body = createTokens;
}

exports.invalidateRefreshToken = invalidateRefreshToken;
exports.createAccessAndRefreshTokens = createAccessAndRefreshTokens;
exports.setCookiesAndTokens = setCookiesAndTokens;