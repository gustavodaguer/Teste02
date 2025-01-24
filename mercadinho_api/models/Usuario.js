const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Usuario = sequelize.define("Usuario", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [["Admin", "Gerente", "Caixa"]], // Restringe os valores possíveis
    },
  },
});

module.exports = Usuario;
