const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Cliente = sequelize.define("Cliente", {
  cpf: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endereco: {
    type: DataTypes.STRING,
  },
  tipo_cliente: {
    type: DataTypes.ENUM("ouro", "prata", "bronze"),
    allowNull: false,
  },
  credito: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

module.exports = Cliente;
