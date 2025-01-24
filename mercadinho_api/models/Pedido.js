const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Fornecedor = require("./Fornecedor"); // Assumindo que o modelo Fornecedor já está criado

const Pedido = sequelize.define("Pedido", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  fornecedor_id: {
    type: DataTypes.STRING,
    references: {
      model: Fornecedor,
      key: "cnpj",
    },
    allowNull: false,
  },
  produtos: {
    type: DataTypes.JSONB, // Armazena uma lista de produtos e quantidades
    allowNull: false,
  },
  valor_total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

Pedido.belongsTo(Fornecedor, { foreignKey: "fornecedor_id", as: "fornecedor" });

module.exports = Pedido;
