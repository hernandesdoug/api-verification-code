const { Sequelize } = require("sequelize");

const databaseName = process.env.DATABASE_NAME;
const databaseUser = process.env.DATABASE_USER;
const databasePassword = process.env.DATABASE_PASSWORD;
const databaseHost = process.env.DATABASE_HOST;

const sequelize = new Sequelize(databaseName, databaseUser, databasePassword, {
    dialect: "mysql",
    host: databaseHost,
  });
  
  module.exports = sequelize;