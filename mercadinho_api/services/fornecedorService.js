const fornecedorRepository = require("../repositories/fornecedorRepository");

const fornecedorService = {
  create: (data) => fornecedorRepository.create(data),
  getAll: () => fornecedorRepository.findAll(),
  getById: (cnpj) => fornecedorRepository.findById(cnpj),
  update: (cnpj, data) => fornecedorRepository.update(cnpj, data),
  delete: (cnpj) => fornecedorRepository.delete(cnpj),
};

module.exports = fornecedorService;
