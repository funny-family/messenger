const User = require('../../user/models/User');
const BlackToken = require('../models/BlackToken');
const clearCookies = require('./cookies-cleaner');
const createTokens = require('./tokens-creator');
const setCookiesAndTokens = require('./cookies-setter');

exports.signup = async ctx => {
  const userData = ctx.request.body;
  const newUser = new User(userData);
  newUser.validation_token = 'uuid' + Math.random();
  await newUser.save();
  ctx.type = 'json';
  ctx.body = newUser;
};

exports.signin = async ctx => {
  const tokens = createTokens(ctx.state.user);
  await setCookiesAndTokens(ctx, tokens);
  ctx.type = 'json';
  ctx.body = tokens;
};

exports.signout = async ctx => {
  const access_token = ctx.headers['x-access-token'] ||
                      ctx.query.access_token ||
                      ctx.cookies.get('x-access-token') ||
                      ctx.body && ctx.body.access_token;

  const refresh_token = ctx.headers['x-refresh-token'] ||
                      ctx.query.refresh_token ||
                      ctx.cookies.get('x-refresh-token') ||
                      ctx.body && ctx.body.refresh_token;

  const blackAccessToken = new BlackToken({
    token: access_token
  });
  const blackRefreshToken = new BlackToken({
    token: refresh_token
  });

  await Promise.all([
    blackAccessToken.save(),
    blackRefreshToken.save()
  ]);
  clearCookies(ctx);
  ctx.status = 200;
};
