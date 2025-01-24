const Fornecedor = require("../models/Fornecedor");

const fornecedorRepository = {
  create: (data) => Fornecedor.create(data),
  findAll: () => Fornecedor.findAll(),
  findById: (cnpj) => Fornecedor.findByPk(cnpj),
  update: (cnpj, data) => Fornecedor.update(data, { where: { cnpj } }),
  delete: (cnpj) => Fornecedor.destroy({ where: { cnpj } }),
};

module.exports = fornecedorRepository;
