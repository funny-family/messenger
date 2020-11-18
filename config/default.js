const path = require('path');

const Keygrip = require('keygrip');

const { ObjectConfig, ObjectFactory } = require('./tools/config-builder');

const secretOrKey = 'secret';
const logFileName = 'errors.log';

const configArray = [
  new ObjectConfig({
    secretOrKey
  }),
  new ObjectConfig({
    app: {
      proxy: false,
      keys: new Keygrip([secretOrKey], 'sha256')
    }
  }),
  new ObjectConfig({
    static: {
      entry: 'index.html',
      path: path.join(__dirname, '..', 'client')
    }
  }),
  new ObjectConfig({
    mongoose: {
      uri: 'mongodb://localhost:27017',
      options: {
        dbName: 'messanger',
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }
    }
  }),
  new ObjectConfig({
    crypto: {
      iterations: 100,
      keylen: 100,
      digest: 'sha512'
    }
  }),
  new ObjectConfig({
    jsonwebtoken: {
      algorithm: 'HS512'
    }
  }),
  new ObjectConfig({
    logFile: {
      name: logFileName,
      directory: path.join(__dirname, '..', `logs/${logFileName}`)
    }
  })
];

const objectConfig = new ObjectFactory(configArray).run();

module.exports = objectConfig;
