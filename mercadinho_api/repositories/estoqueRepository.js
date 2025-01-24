const Estoque = require("../models/Estoque");

const estoqueRepository = {
  create: (data) => Estoque.create(data),
  findAll: () => Estoque.findAll(),
  findById: async (codigo_barras) => {
    return await Estoque.findOne({
      where: { codigo_barras },
    });
  },
  update: async (codigo_barras, updates) => {
    const result = await Estoque.update(updates, {
      where: { codigo_barras },
    });
    return result; // Retorna o resultado da atualização
  },
  delete: (codigo_barras) => Estoque.destroy({ where: { codigo_barras } }),
};

module.exports = estoqueRepository;
