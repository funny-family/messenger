const bodyParser = require('@/application/middlewares/local/body-parser');

const KoaRouter = require('koa-router');

const test = new KoaRouter();
test.prefix('/test');

// console.time('process');

test.get('/test', bodyParser, (ctx) => {
  ctx.body = 'test';
});

test.get('/test1', (ctx) => {
  ctx.body = 'test1';
});

// console.log('test route:', test);

// console.timeEnd('process');

module.exports = [
  test
];
