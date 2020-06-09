const Router = require('koa-router');

const auth = new Router({
  prefix: '/auth'
});

auth
  .post('/signup', async ctx => {
    ctx.body = 'signup';
  })
  .post('/signin', async ctx => {
    ctx.body = 'signin';
  })
  .post('/signout', async ctx => {
    ctx.body = 'signout';
  });

module.exports = [auth];