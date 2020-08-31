const User = require('../../../models/User');

module.exports = async ctx => {
  const userData = ctx.request.body;
  const newUser = new User(userData);
  await newUser.save();
  ctx.type = 'json';
  ctx.body = newUser;
};
