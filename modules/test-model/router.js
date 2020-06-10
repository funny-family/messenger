const Router = require('koa-router');

const testRouter = new Router({
  prefix: '/test'
});

testRouter
  .get('/hi', async ctx => {
    ctx.body = 'HI!';
  })
  .post('/hi', async ctx => {
    ctx.body = 'HI!';
  });

module.exports = [testRouter];