const koaRequest = require('koa-http-request');

module.exports = koaRequest({
  dataType: 'json',
  timeout: 3000
});
