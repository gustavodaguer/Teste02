const pedidoService = require("../services/pedidoService");

const pedidoController = {
  create: async (req, res) => {
    try {
      const pedido = await pedidoService.create(req.body);
      res.status(201).json(pedido);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  getAll: async (req, res) => {
    const pedidos = await pedidoService.getAll();
    res.json(pedidos);
  },
  getById: async (req, res) => {
    const pedido = await pedidoService.getById(req.params.id);
    if (!pedido) {
      return res.status(404).json({ message: "Pedido não encontrado" });
    }
    res.json(pedido);
  },
  update: async (req, res) => {
    try {
      await pedidoService.update(req.params.id, req.body);
      res.sendStatus(204);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  delete: async (req, res) => {
    await pedidoService.delete(req.params.id);
    res.sendStatus(204);
  },
};

module.exports = pedidoController;
