module.exports = (app) => {
  app.use(require('./global/headers'));
  app.use(require('./global/error'));
  app.use(require('./global/static'));
  app.use(require('./global/ratelimiter'));
  app.use(require('./global/cors'));
  app.use(require('./global/useragent'));
  app.use(require('./global/http-request'));
  app.use(require('./global/log'));

  // app.use(require('./local/passport').initialize());

  if (process.env.NODE_ENV === 'development') {
    app.use(require('./global/http-request-logger'));
    app.use(require('./global/response-time'));
  }
};
