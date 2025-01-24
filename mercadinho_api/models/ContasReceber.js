const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Cliente = require("./Cliente"); // Assumindo que o modelo Cliente já está criado

const ContasReceber = sequelize.define("ContasReceber", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  cliente_id: {
    type: DataTypes.STRING,
    references: {
      model: Cliente,
      key: "cpf",
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

ContasReceber.belongsTo(Cliente, { foreignKey: "cliente_id", as: "cliente" });

module.exports = ContasReceber;
