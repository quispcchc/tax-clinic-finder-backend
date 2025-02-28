const { Sequelize } = require('sequelize');
require('dotenv').config();

let host, port;

if (process.env.NODE_ENV === 'development') {
  host = 'localhost';
  port = process.env.DB_PORT || 5432;
} else {
  host = `/cloudsql/${process.env.DB_INSTANCE}`;
  port = null;
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: host,
    port: port,
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = sequelize;
