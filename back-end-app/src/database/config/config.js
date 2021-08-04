require('dotenv').config();

module.exports = {
  development2: {
    url: 'postgres://postgres:123@127.0.0.1:5432/BikeStoreDemo',
    dialect: 'postgres',
  },
  development: {
    username: 'dev',
    password: 'pass@word1',
    database: 'BikeStoreDemo',
    host: 'localhost',
    port: 1433,
    dialect: 'mssql',
  },
  test: {
    url: 'postgres://postgres:123@127.0.0.1:5432/BikeStoreDemo',
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
};
