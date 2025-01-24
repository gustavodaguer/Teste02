const estoqueService = require("../services/estoqueService");

const estoqueController = {
  create: async (req, res) => {
    try {
      const item = await estoqueService.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  getAll: async (req, res) => {
    const estoque = await estoqueService.getAll();
    res.json(estoque);
  },
  getById: async (req, res) => {
    const item = await estoqueService.getById(req.params.codigo_barras);
    if (!item) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.json(item);
  },
  update: async (req, res) => {
    try {
      await estoqueService.update(req.params.codigo_barras, req.body);
      res.sendStatus(204);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  delete: async (req, res) => {
    await estoqueService.delete(req.params.codigo_barras);
    res.sendStatus(204);
  },
};

module.exports = estoqueController;
