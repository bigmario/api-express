apiRouter = require('./api/api.route')
productsRouter = require('./products/products.route')


function routerApi(app) {
  app.use('/api', apiRouter);
  apiRouter.use('/products', productsRouter);
}

module.exports = routerApi;
