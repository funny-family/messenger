const jwt = require('jsonwebtoken');
const config = require('config');

// function signJWTToken(user, tokenExpiresTime) {
//   return jwt.sign({ _id: user._id }, config.secretOrKey, {
//     algorithm: config.jsonwebtoken.algorithm,
//     expiresIn: tokenExpiresTime
//   });
// }

exports.createAuthTokens = function (user) {
  if (!user) throw Error('User is required!');

  const accessTokenExpiresIn = 60 * 30; // 60sec * 30 = 30min
  const refreshTokenExpiresIn = 86400 * 30; // 86400inOneDay * 30 = 30days

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
    access_token_expiration_date: Date.now() * accessTokenExpiresIn * 1000,
    refresh_token_expiration_date: Date.now() * refreshTokenExpiresIn * 1000
  };
};
