const ContasPagar = require("../models/ContasPagar");

const contasPagarRepository = {
  bulkCreate: async (parcelas) => {
    try {
      return await ContasPagar.bulkCreate(parcelas);
    } catch (error) {
      console.error("Erro ao criar parcelas em contas a pagar:", error);
      throw new Error("Erro ao criar parcelas em contas a pagar.");
    }
  },
  create: (data) => ContasPagar.create(data),
  findAll: () => ContasPagar.findAll(),
  findById: (id) => ContasPagar.findByPk(id),
  update: (id, data) => ContasPagar.update(data, { where: { id } }),
  delete: (id) => ContasPagar.destroy({ where: { id } }),
};

module.exports = contasPagarRepository;
