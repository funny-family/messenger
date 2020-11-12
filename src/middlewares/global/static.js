const config = require('config');

const serve = require('koa-static');

module.exports = serve(config.staticFile.path, {
  index: config.staticFile.entry || 'index.html',
  maxage: process.env.NODE_ENV ? 8600000 : 0,
  gzip: true
});
