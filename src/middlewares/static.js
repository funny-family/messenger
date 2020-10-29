const config = require('config');
const serve = require('koa-static');

module.exports = serve(config.staticRoot, {
  index: 'index.html',
  maxage: process.env.PROJECT_MODE ? 8600000 : 0,
  gzip: true
});
