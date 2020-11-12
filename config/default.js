const path = require('path');

const { ObjectConfig, ObjectFactory } = require('./tools/config-builder');

const logFileName = 'errors.log';

const configArray = [
  new ObjectConfig({
    secretOrKey: 'secret'
  }),
  new ObjectConfig({
    server: {
      proxy: false
    }
  }),
  new ObjectConfig({
    staticFile: {
      entry: 'index.html',
      path: path.join(process.cwd(), 'src/static')
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
      directory: path.join(__dirname, `../src/logs/${logFileName}`)
    }
  })
];

const objectConfig = new ObjectFactory(configArray).run();

module.exports = objectConfig;
