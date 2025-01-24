const contasPagarService = require("../services/contasPagarService");

const contasPagarController = {
  create: async (req, res) => {
    try {
      const conta = await contasPagarService.create(req.body);
      res.status(201).json(conta);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  getAll: async (req, res) => {
    const contas = await contasPagarService.getAll();
    res.json(contas);
  },
  getById: async (req, res) => {
    const conta = await contasPagarService.getById(req.params.id);
    if (!conta) {
      return res.status(404).json({ message: "Conta não encontrada" });
    }
    res.json(conta);
  },
  update: async (req, res) => {
    try {
      await contasPagarService.update(req.params.id, req.body);
      res.sendStatus(204);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  delete: async (req, res) => {
    await contasPagarService.delete(req.params.id);
    res.sendStatus(204);
  },
};

module.exports = contasPagarController;
