const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const {Strategy} = require('passport-local');

const UserService =  require('../../../services/users/user.service')
const service = new UserService()

const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await service.findOneByEmail(email);
      console.log(user);
      if (!user) {
        done(boom.unauthorized(), false)
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        done(boom.unauthorized(), false)
      }
      delete user.dataValues.password

      done(null, user);

    } catch (error) {
      done(error, false);
    }
});

module.exports = LocalStrategy;
