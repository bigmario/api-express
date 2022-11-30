const { User, UserSchema } = require('./user.model');

async function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
}

module.exports = setupModels;
