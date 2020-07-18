const router = require('./router');
const passport = require('../auth/middlewares/passport');

module.exports = app => {
  app.use(passport.initialize());
  router.forEach(route => {
    app.use(route.routes());
  });
};