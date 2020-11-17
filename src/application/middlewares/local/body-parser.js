const bodyParser = require('koa-bodyparser');

module.exports = bodyParser({ // application/x-www-form-urlencoded and application/json
  formLimit: '56kb',
  jsonLimit: '1mb',
  enableTypes: ['json', 'form'],
  onerror: (ctx) => {
    ctx.throw('Body parse error.', 422);
  }
});
