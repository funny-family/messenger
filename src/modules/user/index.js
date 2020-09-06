const passport = require('@/middlewares/passport');
const router = require('./router');

module.exports = app => {
  app.use(passport.initialize());
  router.forEach(route => {
    app.use(route.routes());
  });
};
