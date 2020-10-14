// const Router = require('koa-router');

const bodyParser = require('@/middlewares/body-parser');

// const { createRoute } = require('../../../core/router');
const { createRoutes } = require('../../../core/router');

const prefix = '/test';
// module.exports = [
//   createRoute({
//     method: 'get',
//     prefix,
//     path: '/test',
//     middlewares: [
//       bodyParser
//     ],
//     callback: (ctx) => { ctx.body = 'test'; }
//   })
// ];

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
  },
  {
    method: 'get',
    prefix,
    path: '/test2',
    middlewares: [
      bodyParser
    ],
    callback: (ctx) => { ctx.body = 'test2'; }
  }
];

module.exports = createRoutes(routes);

// module.exports = [
//   {
//     method: 'get',
//     prefix,
//     path: '/test',
//     middlewares: [
//       bodyParser
//     ],
//     callback: (ctx) => { ctx.body = 'test'; }
//   },
//   {
//     method: 'get',
//     prefix,
//     path: '/test1',
//     middlewares: [
//       bodyParser
//     ],
//     callback: (ctx) => { ctx.body = 'test1'; }
//   },
//   {
//     method: 'get',
//     prefix,
//     path: '/test2',
//     middlewares: [
//       bodyParser
//     ],
//     callback: (ctx) => { ctx.body = 'test2'; }
//   }
// ];

// const apiV1 = new Router({
//   prefix: '/test'
// });

// apiV1.get(
//   '/test',
//   bodyParser,
//   (ctx) => { ctx.body = 'test'; }
// );

// module.exports = [apiV1];
