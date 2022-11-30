require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT ,
  dbEngine: process.env.DB_ENGINE,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbPostgresPort: process.env.DB_POSTGRES_PORT,
  dbMySQLPort: process.env.DB_MYSQL_PORT,
}

module.exports = { config };
