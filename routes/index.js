const apiRouter = require('./api/api.route');
const productsRouter = require('./products/products.router');
const categoriesRouter = require('./categories/categories.router');
const usersRouter = require('./users/users.router');
const orderRouter = require('./orders/orders.router');
const customersRouter = require('./customers/customers.router');
const authRouter = require('./auth/auth.route');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');


function routerApi(app) {
  app.use('/api', apiRouter);

  apiRouter.use('/auth', authRouter);

  apiRouter.use(
    '/products',
    passport.authenticate('jwt', {session: false}),
    checkRoles(['admin']),
    productsRouter
  );

  apiRouter.use(
    '/categories',
    passport.authenticate('jwt', {session: false}),
    checkRoles(['admin']),
    categoriesRouter
  );

  apiRouter.use('/users', usersRouter);

  apiRouter.use(
    '/orders',
    passport.authenticate('jwt', {session: false}),
    checkRoles(['admin']),
    orderRouter
  );

  apiRouter.use(
    '/customers',
    passport.authenticate('jwt', {session: false}),
    checkRoles(['admin']),
    customersRouter
  );
}

module.exports = routerApi;
