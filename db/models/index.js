const { Customer, CustomerSchema } = require('./customer.model');
const { User, UserSchema } = require('./user.model');

async function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));

  Customer.associate(sequelize.models);
  User.associate(sequelize.models);
}

module.exports = setupModels;
