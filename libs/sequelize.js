const { Sequelize } = require('sequelize');

const { config } = require('../config/config')
const setupModels = require('../db/models')


const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPostgresPort}/${config.dbName}`
const URI_MYSQL = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbMySQLPort}/${config.dbName}`

let sequelize;

sequelize = new Sequelize(config.dbEngine === 'postgres'? URI : URI_MYSQL, {
  dialect: config.dbEngine,
  logging: console.log,
});

setupModels(sequelize);
sequelize.sync();

module.exports = sequelize;
