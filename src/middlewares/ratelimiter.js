const ratelimit = require('koa-ratelimit');

const database = new Map();
let maxNumberOfRequests = 4;
let delayTime = 30000; // 30sec

if (process.env.PROJECT_MODE === 'development') {
  maxNumberOfRequests = 6;
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
    limit: 'X-RateLimit-Limit',
    remaining: 'X-RateLimit-Remaining',
    reset: 'X-RateLimit-Reset',
    total: 'X-Rate-Limit-Total'
  },
  max: maxNumberOfRequests
});
