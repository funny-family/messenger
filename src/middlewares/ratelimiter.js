const ratelimit = require('koa-ratelimit');

const database = new Map();
let maximumNumberOfRequests = 4;
let delayTime = 30000; // 30sec

if (global.__DEV__ === process.env.NODE_ENV) {
  maximumNumberOfRequests = 6;
  delayTime = 5000; // 5sec
}

module.exports = ratelimit({
  driver: 'memory',
  db: database,
  duration: delayTime,
  errorMessage: {
    message: 'Number of requests exceeded.'
  },
  id: (ctx) => ctx.ip,
  headers: {
    remaining: 'Rate-Limit-Remaining',
    reset: 'Rate-Limit-Reset',
    total: 'Rate-Limit-Total'
  },
  max: maximumNumberOfRequests
});
