const User = require('./models/User');

module.exports = app => {
  app.use(User);
};