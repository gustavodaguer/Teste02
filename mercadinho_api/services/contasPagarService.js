const contasPagarRepository = require("../repositories/contasPagarRepository");

const contasPagarService = {
  create: async (data) => {
    return await contasPagarRepository.create(data);
  },
  createParcelas: async (
    fornecedor_id,
    valor_total,
    numero_parcelas,
    data_pedido
  ) => {
    const valorParcela = (valor_total / numero_parcelas).toFixed(2);

    for (let i = 0; i < numero_parcelas; i++) {
      const dataVencimento = new Date(data_pedido);
      dataVencimento.setMonth(dataVencimento.getMonth() + i + 1); // Define vencimento mensal para cada parcela

      await contasPagarRepository.create({
        fornecedor_id,
        data_vencimento: dataVencimento,
        valor_parcela: valorParcela,
      });
    }
  },
  getAll: () => contasPagarRepository.findAll(),
  getById: (id) => contasPagarRepository.findById(id),
  update: async (id, data) => {
    return await contasPagarRepository.update(id, data);
  },
  delete: (id) => contasPagarRepository.delete(id),
};

module.exports = contasPagarService;
