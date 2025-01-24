const Vendas = require("../models/Vendas");

const vendasRepository = {
  create: (data) => Vendas.create(data),
  findAll: () => Vendas.findAll(),
  findById: (id) => Vendas.findByPk(id),
  update: (id, data) => Vendas.update(data, { where: { id } }),
  delete: (id) => Vendas.destroy({ where: { id } }),
};

module.exports = vendasRepository;
