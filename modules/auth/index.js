const router = require('./router');

module.exports = app => {
  router.forEach(route => {
    app.use(route.routes());
  });
};