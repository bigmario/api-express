apiRouter = require('./api.route')
productsRouter = require('./products.route')

function routerApi(app) {
  app.use('/api', apiRouter);
  app.use('/api/products', productsRouter);
}

module.exports = routerApi;