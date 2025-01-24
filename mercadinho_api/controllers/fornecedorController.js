const fornecedorService = require("../services/fornecedorService");

const fornecedorController = {
  create: async (req, res) => {
    try {
      const fornecedor = await fornecedorService.create(req.body);
      res.status(201).json(fornecedor);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  getAll: async (req, res) => {
    const fornecedores = await fornecedorService.getAll();
    res.json(fornecedores);
  },
  getById: async (req, res) => {
    const fornecedor = await fornecedorService.getById(req.params.cnpj);
    if (!fornecedor) {
      return res.status(404).json({ message: "Fornecedor não encontrado" });
    }
    res.json(fornecedor);
  },
  update: async (req, res) => {
    try {
      await fornecedorService.update(req.params.cnpj, req.body);
      res.sendStatus(204);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  delete: async (req, res) => {
    await fornecedorService.delete(req.params.cnpj);
    res.sendStatus(204);
  },
};

module.exports = fornecedorController;
