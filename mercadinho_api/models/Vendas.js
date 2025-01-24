const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Cliente = require("./Cliente");

const Venda = sequelize.define("Venda", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Gera automaticamente o valor
  },
  cliente_id: {
    type: DataTypes.STRING,
    references: {
      model: Cliente,
      key: "cpf",
    },
    allowNull: false,
  },
  endereco_entrega: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_venda: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  produtos: {
    type: DataTypes.JSON, // [{ produtoId, quantidade }]
    allowNull: false,
  },
  valor_total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  tipo_pagamento: {
    type: DataTypes.ENUM(
      "cartão de crédito",
      "cartão de débito",
      "pix",
      "loja"
    ),
    allowNull: false,
  },
  parcelas: {
    type: DataTypes.INTEGER, // Apenas para cartão de crédito
    allowNull: true,
    defaultValue: 1,
  },
});

module.exports = Venda;
