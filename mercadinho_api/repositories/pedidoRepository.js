const Pedido = require("../models/Pedido");

const pedidoRepository = {
  create: (data) => Pedido.create(data),
  findAll: () => Pedido.findAll(),
  findById: (id) => Pedido.findByPk(id),
  update: (id, data) => Pedido.update(data, { where: { id } }),
  delete: (id) => Pedido.destroy({ where: { id } }),
};

module.exports = pedidoRepository;
