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
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      ctx.status = 400;
    }
    if (err.name === 'AuthenticationError') {
      ctx.status = 401;
    }
    if (err.name === 'AuthenticationError' && err.message === 'Bad Request') {
      ctx.status = 400;
    }
    if (err.name === 'MongoError') {
      ctx.status = 400;
    }
    if (err.errors) {
      let errorContainer = {};
      for (const field in err.errors) {
        errorContainer = err;
        delete err.errors[field].properties.type;
        delete err.errors[field].path;
        delete err.errors[field].kind;
        delete err.errors[field].value;
        delete err._message;
        delete err.message;
      }
      ctx.type = 'json';
      ctx.body = errorContainer;
    } else {
      ctx.type = 'json';
      ctx.body = err.message;
    }
  }
};
