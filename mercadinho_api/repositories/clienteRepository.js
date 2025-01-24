const Cliente = require("../models/Cliente");

const clienteRepository = {
  create: (data) => Cliente.create(data),
  findAll: () => Cliente.findAll(),
  findById: (cpf) => Cliente.findByPk(cpf),
  update: (cpf, data) => Cliente.update(data, { where: { cpf } }),
  delete: (cpf) => Cliente.destroy({ where: { cpf } }),
};

module.exports = clienteRepository;
