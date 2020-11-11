const config = require('config');

const bunyan = require('bunyan');

const logger = bunyan.createLogger({
  name: 'messenger',
  streams: [
    {
      level: 'fatal' || 'error',
      path: config.logFile.directory
    }
  ]
});

module.exports = logger;
