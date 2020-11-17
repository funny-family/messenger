const config = require('config');

const serve = require('koa-static');

module.exports = async (ctx, next) => {
  const options = {
    index: config.staticFile.entry || 'index.html',
    maxage: process.env.NODE_ENV ? 8600000 : 0,
    gzip: true,
    hidden: false
  };

  await serve(config.staticFile.path, options)(ctx, next);
};
