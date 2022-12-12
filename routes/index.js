const apiRouter = require('./api/api.route');
const productsRouter = require('./products/products.router');
const categoriesRouter = require('./categories/categories.router');
const usersRouter = require('./users/users.router');
const orderRouter = require('./orders/orders.router');
const customersRouter = require('./customers/customers.router');
const authRouter = require('./auth/auth.route');
const profileRouter = require('./profile/profile.route');

const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');


function routerApi(app) {
  app.use('/api', apiRouter);

  apiRouter.use('/auth', authRouter);

  apiRouter.use(
    '/products',
    passport.authenticate('jwt', {session: false}),
    checkRoles('admin', 'customer'),
    productsRouter
  );

  apiRouter.use(
    '/categories',
    passport.authenticate('jwt', {session: false}),
    checkRoles('admin', 'customer'),
    categoriesRouter
  );

  apiRouter.use('/users', usersRouter);

  apiRouter.use(
    '/orders',
    passport.authenticate('jwt', {session: false}),
    checkRoles('admin', 'customer'),
    orderRouter
  );

  apiRouter.use('/customers', customersRouter);

  apiRouter.use(
    '/profile',
    passport.authenticate('jwt', {session: false}),
    checkRoles('admin', 'customer'),
    profileRouter
  );
}

module.exports = routerApi;
