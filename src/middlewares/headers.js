module.exports = async function (ctx, next) {
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080');
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:8081');
  ctx.set('Access-Control-Allow-Credentials', 'true');
  ctx.set('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
  await next();
};
