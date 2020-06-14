const Router = require('koa-router');
const User = require('../user/models/User');
const bodyParser = require('../../middlewares/body-parser');

const auth = new Router({
  prefix: '/auth'
});

auth
  .post('/signup', bodyParser, async ctx => {
    const userData = ctx.request.body;
    const newUser = new User(userData);
    newUser.validation_token = 'uuid' + Math.random();
    await newUser.save();
    ctx.body = newUser;
  })
  .post('/signin', bodyParser, async ctx => {
    ctx.body = 'signin';
  })
  .post('/signout', async ctx => {
    ctx.body = 'signout';
  });

module.exports = [auth];