module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.log.error(err);
    if (global.__DEV__ === process.env.NODE_ENV) console.error(err);
    if (ctx.status > 500) {
      ctx.status = 500;
      ctx.body = 'Server error';
      return ctx.body;
    }
    ctx.body = err.message;
  }
};