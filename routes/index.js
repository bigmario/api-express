const apiRouter = require('./api/api.route');
const productsRouter = require('./products/products.router');
const categoriesRouter = require('./categories/categories.router');
const usersRouter = require('./users/users.router');
const orderRouter = require('./orders/orders.router');
const customersRouter = require('./customers/customers.router');


function routerApi(app) {
  app.use('/api', apiRouter);
  apiRouter.use('/products', productsRouter);
  apiRouter.use('/categories', categoriesRouter);
  apiRouter.use('/users', usersRouter);
  apiRouter.use('/orders', orderRouter);
  apiRouter.use('/customers', customersRouter);
}

module.exports = routerApi;
