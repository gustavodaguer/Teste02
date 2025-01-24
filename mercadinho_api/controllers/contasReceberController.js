const contasReceberService = require("../services/contasReceberService");

const contasReceberController = {
  create: async (req, res) => {
    try {
      const conta = await contasReceberService.create(req.body);
      res.status(201).json(conta);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  getAll: async (req, res) => {
    const contas = await contasReceberService.getAll();
    res.json(contas);
  },
  getById: async (req, res) => {
    const conta = await contasReceberService.getById(req.params.id);
    if (!conta) {
      return res.status(404).json({ message: "Conta não encontrada" });
    }
    res.json(conta);
  },
  update: async (req, res) => {
    try {
      await contasReceberService.update(req.params.id, req.body);
      res.sendStatus(204);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  delete: async (req, res) => {
    await contasReceberService.delete(req.params.id);
    res.sendStatus(204);
  },
};

module.exports = contasReceberController;
