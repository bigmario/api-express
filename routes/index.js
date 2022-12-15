const apiRouter = require('./api/api.route');
const usersRouter = require('./users/users.router');
const authRouter = require('./auth/auth.route');

const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');


function routerApi(app) {
  app.use('/api', apiRouter);

  apiRouter.use('/auth', authRouter);

  apiRouter.use(
    '/users',
    passport.authenticate('jwt', {session: false}),
    checkRoles('admin'),
    usersRouter);
}

module.exports = routerApi;
