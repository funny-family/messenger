const ratelimit = require('koa-ratelimit');

const database = new Map();
let maximumNumberOfRequests = 4;

if (global.__DEV__ === process.env.NODE_ENV) {
  maximumNumberOfRequests = 6;
}

module.exports = ratelimit({
  driver: 'memory',
  db: database,
  duration: 30000, // 30sec
  errorMessage: 'Number of requests exceeded.',
  id: (ctx) => ctx.ip,
  headers: {
    remaining: 'Rate-Limit-Remaining',
    reset: 'Rate-Limit-Reset',
    total: 'Rate-Limit-Total'
  },
  max: maximumNumberOfRequests
});