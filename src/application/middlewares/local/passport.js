const passport = require('koa-passport');

passport.use('local', require('@/application/strategies/local'));
passport.use('jwt', require('@/application/strategies/jwt'));

module.exports = {
  initialize: () => {
    return passport.initialize();
  },
  authenticate: (strategy, options) => {
    return async (ctx, next) => {
      await passport.authenticate(strategy, { session: false, ...options }, async (err, user, info) => {
        function setStatus(statusCode) {
          if (typeof statusCode !== 'number') {
            throw new TypeError('Status code must be type of number!');
          }

          ctx.status = statusCode;
          return ctx.status;
        }

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
