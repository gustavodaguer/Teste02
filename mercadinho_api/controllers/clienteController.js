const clienteService = require("../services/clienteService");

const clienteController = {
  create: async (req, res) => {
    try {
      const cliente = await clienteService.create(req.body);
      res.status(201).json(cliente);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  getAll: async (req, res) => {
    const clientes = await clienteService.getAll();
    res.json(clientes);
  },
  getById: async (req, res) => {
    const cliente = await clienteService.getById(req.params.cpf);
    res.json(cliente);
  },
  update: async (req, res) => {
    await clienteService.update(req.params.cpf, req.body);
    res.sendStatus(204);
  },
  delete: async (req, res) => {
    await clienteService.delete(req.params.cpf);
    res.sendStatus(204);
  },
};

module.exports = clienteController;
