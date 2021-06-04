require('dotenv').config();

const { DB_USER, DB_PASS, DB_NAME, DB_HOST } = process.env;

module.exports = {
  "development": {
    "username": DB_USER,
    "password": DB_PASS,
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": "postgres"
  },
  "test": {
    "username": DB_USER,
    "password": DB_PASS,
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.DB_USER_PROD,
    "password": process.env.DB_PASS_PROD,
    "database": process.env.DB_NAME_PROD,
    "host": process.env.DB_HOST_PROD,
    "port": process.env.DB_PORT_PROD,
    "dialectOptions": {
      "ssl": {
        "require": true, // This will help you. But you will see nwe error
        "rejectUnauthorized": false // This line will fix new error
      }
    },
    "dialect": "postgres"
  }
}