const bodyParser = require('@/middlewares/body-parser');

const { createRoutes } = require('../../../core/router');

const prefix = '/test';

const routes = [
  {
    method: 'get',
    prefix,
    path: '/test',
    middlewares: [
      bodyParser
    ],
    callback: (ctx) => { ctx.body = 'test'; }
  },
  {
    method: 'get',
    prefix,
    path: '/test1',
    middlewares: [
      bodyParser
    ],
    callback: (ctx) => { ctx.body = 'test1'; }
  }
];

module.exports = [createRoutes(routes)];

// const Router = require('koa-router');

// const apiV1 = new Router({
//   prefix: '/test'
// });

// apiV1.get(
//   '/test',
//   bodyParser,
//   (ctx) => { ctx.body = 'test'; }
// );

// apiV1.get(
//   '/test1',
//   bodyParser,
//   (ctx) => { ctx.body = 'test1'; }
// );

// console.log('apiV1:', apiV1);

// module.exports = [apiV1];
