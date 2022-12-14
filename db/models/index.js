const { Session, SessionSchema } = require('./session.model');
const { User, UserSchema } = require('./user.model');

async function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Session.init(SessionSchema, Session.config(sequelize));

  User.associate(sequelize.models);
  Session.associate(sequelize.models);
}

module.exports = setupModels;
