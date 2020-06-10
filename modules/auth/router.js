const Router = require('koa-router');
const User = require('../user/models/User');

const auth = new Router({
  prefix: '/auth'
});

auth
  .post('/signup', async ctx => {
    const userData = ctx.request.body;
    const newUser = new User(userData);
    console.log(newUser);
    // newUser.save();
  })
  .post('/signin', async ctx => {
    ctx.body = 'signin';
  })
  .post('/signout', async ctx => {
    ctx.body = 'signout';
  });

module.exports = [auth];