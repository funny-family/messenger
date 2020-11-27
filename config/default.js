const path = require('path');

const Keygrip = require('keygrip');

const secretOrKey = 'secret';
const logFileName = 'errors.log';

const config = {
  app: {
    proxy: false,
    keys: new Keygrip([secretOrKey], 'sha256'),
    secretOrKey
  },
  static: {
    entry: 'index.html',
    path: path.join(__dirname, '..', 'client')
  },
  mongoose: {
    uri: 'mongodb://localhost:27017',
    options: {
      dbName: 'messanger',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  },
  crypto: {
    iterations: 100,
    keylen: 100,
    digest: 'sha512'
  },
  jsonwebtoken: {
    algorithm: 'HS512'
  },
  authData: {
    accessTokenName: 'access_token',
    refreshTokenName: 'refresh_token',
    accessTokenCookieName: 'x-access-token',
    refreshTokenCookieName: 'x-refresh-token',
    findToken(context, cookieName, tokenName) {
      return (
        context.query[tokenName] ||
        context.body && context.body.refresh_token ||
        context.headers[cookieName] ||
        context.cookies.get(cookieName)
      );
    }
  },
  logFile: {
    name: logFileName,
    directory: path.join(__dirname, '..', `logs/${logFileName}`)
  }
};

module.exports = config;
