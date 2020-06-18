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
    if (err.errors) {
      const errorMessages = [];
      for (const field in err.errors) {
        errorMessages.push({
          field,
          errorMessage: err.errors[field].message
        });
      }
      ctx.body = errorMessages;
    } else {
      ctx.body = err.message;
    }
  }
};