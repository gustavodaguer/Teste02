const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("bd-comercio", "gustavodaguer", "postgres", {
  host: "localhost",
  dialect: "postgres",
  logging: false, // Desabilita logs SQL, opcional
});

module.exports = sequelize;
