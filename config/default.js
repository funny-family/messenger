const path = require('path');

const Keygrip = require('keygrip');

const secretOrKey = 'secret';
const logFileName = 'errors.log';

const config = {
  secretOrKey,
  app: {
    proxy: false,
    keys: new Keygrip([secretOrKey], 'sha256')
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
  logFile: {
    name: logFileName,
    directory: path.join(__dirname, '..', `logs/${logFileName}`)
  }
};

module.exports = config;
