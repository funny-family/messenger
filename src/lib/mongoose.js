const mongoose = require('mongoose');
const config = require('config');

const log = require('./bunyan').child({ level: 'fatal' });

mongoose.Promise = global.Promise;

mongoose.connect(config.mongoose.uri, config.mongoose.options).catch(err => {
  console.error(err);
  log.fatal(err);
});

mongoose.connection.on('connected', () => {
  console.info('\x1b[32m', `Connected to ${config.mongoose.options.dbName} db`);
});

mongoose.connection.on('error', () => {
  console.error('\x1b[31m', `Cannot connect to ${config.mongoose.options.dbName} db`);
});

module.exports = mongoose;
