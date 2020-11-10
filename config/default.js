const path = require('path');

const logFileName = 'errors.log';

module.exports = {
  staticRoot: path.join(process.cwd(), 'src/static'),
  proxy: false,
  secretOrKey: 'secret',
  logFile: {
    name: logFileName,
    directory: path.join(__dirname, `../src/logs/${logFileName}`)
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
  }
};
