const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Fornecedor = require("./Fornecedor"); // Assumindo que o modelo Fornecedor já está criado
const Pedido = require("./Pedido");

const ContasPagar = sequelize.define("ContasPagar", {
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
  data_vencimento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  valor_parcela: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

ContasPagar.associate = (models) => {
  ContasPagar.belongsTo(models.Fornecedor, { foreignKey: "fornecedor_id" });
  ContasPagar.belongsTo(models.Pedido, { foreignKey: "pedido_id" });
};

module.exports = ContasPagar;
