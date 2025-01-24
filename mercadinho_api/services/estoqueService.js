const estoqueRepository = require("../repositories/estoqueRepository");

const estoqueService = {
  create: async (data) => {
    // Regras de Negócio: Verificar quantidade máxima
    if (data.quantidade_estoque > data.quantidade_maxima) {
      throw new Error(
        "A quantidade inicial não pode ultrapassar a quantidade máxima permitida."
      );
    }
    return await estoqueRepository.create(data);
  },
  getAll: () => estoqueRepository.findAll(),
  getById: (codigo_barras) => estoqueRepository.findById(codigo_barras),
  update: async (codigo_barras, data) => {
    // Regras de Negócio: Verificar limites de quantidade
    const item = await estoqueRepository.findById(codigo_barras);
    if (!item) {
      throw new Error("Produto não encontrado.");
    }
    const novaQuantidade = data.quantidade_estoque || item.quantidade_estoque;
    if (novaQuantidade < item.quantidade_minima) {
      // Aqui você poderia implementar a criação de um pedido automático ao fornecedor
      console.log(
        "A quantidade está abaixo do mínimo. Deve ser gerado um pedido ao fornecedor."
      );
    }
    if (novaQuantidade > item.quantidade_maxima) {
      throw new Error(
        "A quantidade não pode ultrapassar o limite máximo definido."
      );
    }
    return await estoqueRepository.update(codigo_barras, data);
  },
  delete: (codigo_barras) => estoqueRepository.delete(codigo_barras),
};

module.exports = estoqueService;
