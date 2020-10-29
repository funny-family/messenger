const bodyParser = require('@/middlewares/local/body-parser');

const { createRoutes } = require('../../../core/router');

const routes = [
  {
    method: 'get',
    path: '/test',
    middlewares: [
      bodyParser
    ],
    callback(ctx) { ctx.body = 'test'; }
  },
  {
    method: 'get',
    path: '/test1',
    callback(ctx) { ctx.body = 'test1'; }
  }
];

module.exports = [
  createRoutes(routes, '/test')
];
