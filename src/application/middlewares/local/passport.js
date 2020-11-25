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
        const calculateStatus = () => {
          if (err) {
            ctx.status = 500;
          }

          if (strategy === 'local') {
            if (info.message) {
              ctx.status = 400;
            }

            ctx.status = 401;
          }
        };

        const calculatedStatus = calculateStatus();

        if (err) throw ctx.throw(calculatedStatus, err);

        if (!user) {
          return ctx.throw(calculatedStatus, info);
        }

        ctx.state.user = user;

        await next();
      })(ctx, next);
    };
  }
};
