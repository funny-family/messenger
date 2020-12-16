const passport = require('koa-passport');

passport.use('local', require('@/application/strategies/local.strategy'));
passport.use('jwt', require('@/application/strategies/jwt.strategy'));

module.exports = {
  initialize() {
    return passport.initialize();
  },
  authorize() {
    return passport.authorize();
  },
  authenticate(strategy, options = { session: false, failWithError: true }) { //  Do not use try/catch block in passport.authenticate callback!
    return async (ctx, next) => {
      function setStatus(statusCode) {
        if (typeof statusCode !== 'number') {
          throw new TypeError('Status code must be type of number!');
        }

        ctx.status = statusCode;
        return ctx.status;
      }

      await passport.authenticate(strategy, { ...options }, async (err, user, info) => {
        if (err) throw ctx.throw(setStatus(500), err);

        if (!user) {
          if (strategy === 'local') {
            return ctx.throw(info.message ? setStatus(400) : setStatus(401), info);
          }
        }

        ctx.state.user = user;

        await next();
      })(ctx, next);
    };
  }
};
