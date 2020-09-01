const responseTime = require('koa-response-time');

module.exports = responseTime({ hrtime: true });
