const clienteRepository = require("../repositories/clienteRepository");

const clienteService = {
  create: (data) => clienteRepository.create(data),
  getAll: () => clienteRepository.findAll(),
  getById: (cpf) => clienteRepository.findById(cpf),
  update: (cpf, data) => clienteRepository.update(cpf, data),
  delete: (cpf) => clienteRepository.delete(cpf),
};

module.exports = clienteService;
