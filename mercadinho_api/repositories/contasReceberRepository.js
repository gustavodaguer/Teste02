const ContasReceber = require("../models/ContasReceber");

const contasReceberRepository = {
  create: (data) => ContasReceber.create(data),
  findAll: () => ContasReceber.findAll(),
  findById: (id) => ContasReceber.findByPk(id),
  update: (id, data) => ContasReceber.update(data, { where: { id } }),
  delete: (id) => ContasReceber.destroy({ where: { id } }),
};

module.exports = contasReceberRepository;
