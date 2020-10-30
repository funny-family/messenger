const passport = require('koa-passport');

passport.use('local', require('@/strategies/local'));
passport.use('jwt', require('@/strategies/jwt'));

module.exports = {
  initialize: () => {
    return passport.initialize();
  },
  authenticate: (strategy, options) => {
    return async (ctx, next) => {
      await passport.authenticate(strategy, { session: false, ...options }, async (err, user, info) => {
        if (err) throw ctx.throw(err);

        if (!user) {
          return ctx.throw(
            strategy === 'local' ?
              400 : 401,
            info ? (info.field && !Array.isArray(info)) ?
              JSON.stringify([info]) : info.message ?
                info.message : null : null
          );
        }

        ctx.state.user = user;

        await next();
      })(ctx, next);
    };
  }
};
