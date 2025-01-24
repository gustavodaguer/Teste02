const contasReceberRepository = require("../repositories/contasReceberRepository");

const contasReceberService = {
  create: async (data) => {
    return await contasReceberRepository.create(data);
  },
  createParcelas: async (cliente_id, valor_total, parcelas) => {
    const valorParcela = (valor_total / parcelas).toFixed(2);
    const hoje = new Date();

    for (let i = 0; i < parcelas; i++) {
      const dataVencimento = new Date(hoje);
      dataVencimento.setMonth(dataVencimento.getMonth() + i + 1); // Define o vencimento das parcelas mensais

      await contasReceberRepository.create({
        cliente_id,
        data_vencimento: dataVencimento,
        valor_parcela: valorParcela,
      });
    }
  },
  getAll: () => contasReceberRepository.findAll(),
  getById: (id) => contasReceberRepository.findById(id),
  update: async (id, data) => {
    return await contasReceberRepository.update(id, data);
  },
  delete: (id) => contasReceberRepository.delete(id),
};

module.exports = contasReceberService;
