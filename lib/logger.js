const bunyan = require('bunyan');
const path = require('path');

const logger = bunyan.createLogger({
  name: 'messenger',
  streams: [
    {
      level: 'fatal',
      path: path.join(__dirname, '../logs/errors.js')
    },
    {
      level: 'error',
      path: path.join(__dirname, '../logs/errors.js')
    }
  ]
});

module.exports = logger;