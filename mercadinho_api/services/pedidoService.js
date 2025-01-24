const pedidosRepository = require("../repositories/pedidoRepository");
const fornecedorRepository = require("../repositories/fornecedorRepository");
const estoqueRepository = require("../repositories/estoqueRepository");
const contasPagarRepository = require("../repositories/contasPagarRepository");

const pedidosService = {
  // Cria um novo pedido
  create: async (data) => {
    const { fornecedor_id, produtos } = data;

    // Validação do fornecedor
    const fornecedor = await fornecedorRepository.findById(fornecedor_id);
    if (!fornecedor) {
      throw new Error("Fornecedor não encontrado.");
    }

    const numeroParcelas = fornecedor.numero_parcelas || 1; // Número de parcelas padrão 1

    // Atualizar estoque e calcular valor total do pedido
    let valorTotal = 0;

    for (const produto of produtos) {
      const {
        codigo_barras,
        nome_produto,
        unidade_medida,
        quantidade_estoque,
        preco_custo,
        preco_venda,
        promocao,
        quantidade_minima,
        quantidade_maxima,
      } = produto;

      if (!codigo_barras || !nome_produto || !unidade_medida) {
        throw new Error("Dados obrigatórios do produto estão ausentes.");
      }

      if (quantidade_estoque <= 0 || preco_custo <= 0) {
        throw new Error(
          "Quantidade em estoque e preço de custo devem ser maiores que zero."
        );
      }

      if (quantidade_minima > quantidade_maxima) {
        throw new Error(
          `Para o produto ${nome_produto}, a quantidade mínima não pode ser maior que a máxima.`
        );
      }

      // Verifica se o produto já existe no estoque
      const itemEstoque = await estoqueRepository.findById(codigo_barras);

      if (!itemEstoque) {
        // Produto não existe, cria um novo no estoque
        await estoqueRepository.create({
          codigo_barras,
          nome_produto,
          unidade_medida,
          quantidade_estoque,
          preco_custo,
          preco_venda,
          promocao,
          quantidade_minima,
          quantidade_maxima,
          fornecedor_id: fornecedor.cnpj,
        });
      } else {
        // Produto já existe, atualiza o estoque
        const novaQuantidade =
          itemEstoque.quantidade_estoque + quantidade_estoque;
        const novoPrecoCusto =
          (itemEstoque.preco_custo * itemEstoque.quantidade_estoque +
            preco_custo * quantidade_estoque) /
          novaQuantidade;

        await estoqueRepository.update(itemEstoque.codigo_barras, {
          quantidade_estoque: novaQuantidade,
          preco_custo: novoPrecoCusto,
          preco_venda: preco_venda || itemEstoque.preco_venda, // Atualiza preço de venda se fornecido
          promocao,
        });
      }

      // Calcula o valor total do pedido
      valorTotal += quantidade_estoque * preco_custo;
    }

    // Cria o pedido no repositório
    const pedido = await pedidosRepository.create({
      fornecedor_id,
      produtos,
      valor_total: valorTotal,
    });

    // Criar parcelas em Contas a Pagar
    const valorParcela = (valorTotal / numeroParcelas).toFixed(2); // Divide o valor total pelo número de parcelas
    const parcelas = Array.from({ length: numeroParcelas }).map((_, index) => ({
      pedido_id: pedido.id,
      fornecedor_id,
      valor_parcela: valorParcela,
      data_vencimento: new Date(
        new Date().setMonth(new Date().getMonth() + (index + 1))
      ), // Cada parcela com vencimento mensal
    }));

    // Salvar parcelas no banco
    await contasPagarRepository.bulkCreate(parcelas);

    return pedido;
  },

  // Retorna todos os pedidos
  getAll: async () => {
    return await pedidosRepository.findAll();
  },

  // Retorna um pedido pelo ID
  getById: async (id) => {
    const pedido = await pedidosRepository.findById(id);
    if (!pedido) {
      throw new Error("Pedido não encontrado.");
    }
    return pedido;
  },

  // Atualiza um pedido
  update: async (id, data) => {
    const pedido = await pedidosRepository.findById(id);
    if (!pedido) {
      throw new Error("Pedido não encontrado.");
    }

    // Atualiza o pedido no repositório
    const updatedPedido = await pedidosRepository.update(id, data);
    return updatedPedido;
  },

  // Exclui um pedido
  delete: async (id) => {
    const pedido = await pedidosRepository.findById(id);
    if (!pedido) {
      throw new Error("Pedido não encontrado.");
    }

    // Exclui o pedido no repositório
    await pedidosRepository.delete(id);
  },
};

module.exports = pedidosService;
