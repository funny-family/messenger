const router = require('./router');
const passport = require('../../middlewares/passport');

module.exports = app => {
  app.use(passport.initialize());
  router.forEach(route => {
    app.use(route.routes());
  });
};
