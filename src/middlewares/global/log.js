const logger = require('@/infrastructure/logger');

module.exports = async (ctx, next) => {
  const log = logger.child({
    requestId: Math.random(),
    url: ctx.url,
    level: 'error'
  });

  ctx.log = log;

  await next();
};
