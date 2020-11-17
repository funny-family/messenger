// const passport = require('@/middlewares/passport');
const router = require('./routes');

module.exports = app => {
  // app.use(passport.initialize());
  router.forEach(route => {
    app.use(route.routes());
  });
};

// https://github.com/apavamontri/nodejs-clean

// https://github.com/jbuget/nodejs-clean-architecture-app

// https://medium.com/@alameerashraf/nodejs-a-clean-architecture-931898b00d68

// https://mannhowie.com/clean-architecture-node

// https://www.youtube.com/watch?v=u6gAVCEJjQ4&ab_channel=devschacht
