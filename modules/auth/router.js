const Router = require('koa-router');
const User = require('../user/models/User');
const bodyParser = require('../../middlewares/body-parser');
const passport = require('./middlewares/passport');
const tokenContoller = require('./controllers/tokens');

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
  .post('/signin', bodyParser, passport.authenticate('local', { session: false }), async ctx => {
    const tokens = tokenContoller.createAccessAndRefreshTokens(ctx.state.user);
    await tokenContoller.setCookiesAndTokens(ctx, tokens);
    ctx.status = 200;
  })
  .post('/signout', async ctx => {
    ctx.body = 'signout';
  });

module.exports = [auth];