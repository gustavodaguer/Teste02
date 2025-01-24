const vendasService = require("../services/vendasService");
const Venda = require("../models/Vendas.js");
const Cliente = require("../models/Cliente.js");
const ContaReceber = require("../models/ContasReceber.js");

const vendasController = {
  create: async (req, res) => {
    const {
      cliente_id,
      endereco_entrega,
      produtos,
      valor_total,
      tipo_pagamento,
      parcelas = 1,
    } = req.body;

    try {
      const novaVenda = await vendasService.criarVenda({
        cliente_id,
        endereco_entrega,
        produtos,
        valor_total,
        tipo_pagamento,
        parcelas,
      });

      return res.status(201).json(novaVenda);
    } catch (error) {
      console.error("Erro ao criar venda:", error.message);
      return res.status(500).json({ message: error.message });
    }
  },
  getAll: async (req, res) => {
    const vendas = await vendasService.getAll();
    res.json(vendas);
  },
  getById: async (req, res) => {
    const venda = await vendasService.getById(req.params.id);
    if (!venda) {
      return res.status(404).json({ message: "Venda não encontrada" });
    }
    res.json(venda);
  },
  update: async (req, res) => {
    try {
      await vendasService.update(req.params.id, req.body);
      res.sendStatus(204);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  delete: async (req, res) => {
    await vendasService.delete(req.params.id);
    res.sendStatus(204);
  },
};

module.exports = vendasController;
