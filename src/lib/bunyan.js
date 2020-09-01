const bunyan = require('bunyan');
const path = require('path');

const logger = bunyan.createLogger({
  name: 'messenger',
  streams: [
    {
      level: 'fatal' || 'error',
      path: path.join(__dirname, '/../logs/errors.log')
    }
  ]
});

module.exports = logger;
