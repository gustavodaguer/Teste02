const vendasRepository = require("../repositories/vendasRepository.js");
const Cliente = require("../models/Cliente");
const ContaReceber = require("../models/ContasReceber");
const Venda = require("../models/Vendas");
const Estoque = require("../models/Estoque");
const Fornecedor = require("../models/Fornecedor");
const Pedido = require("../models/Pedido");

const vendasService = {
  criarVenda: async ({
    cliente_id,
    endereco_entrega,
    produtos,
    valor_total,
    tipo_pagamento,
    parcelas = 1,
  }) => {
    console.log(valor_total, parcelas);
    // Validação do cliente
    const cliente = await Cliente.findOne({ where: { cpf: cliente_id } });
    if (!cliente) {
      throw new Error("Cliente não encontrado.");
    }

    // Regras de pagamento na loja
    if (tipo_pagamento === "loja") {
      if (valor_total > cliente.credito) {
        throw new Error("Valor da venda excede o crédito disponível.");
      }

      // Cria uma parcela com vencimento em 30 dias
      const vencimento = new Date();
      vencimento.setDate(vencimento.getDate() + 30);
      await ContaReceber.create({
        cliente_id,
        data_vencimento: vencimento,
        valor_parcela: valor_total,
      });
    }

    // Regras para pagamento com cartão de crédito parcelado
    if (tipo_pagamento === "cartão de crédito" && parcelas > 1) {
      const valorParcela = valor_total / parcelas;

      for (let i = 0; i < parcelas; i++) {
        const vencimento = new Date();
        vencimento.setMonth(vencimento.getMonth() + (i + 1));
        await ContaReceber.create({
          cliente_id,
          data_vencimento: vencimento,
          valor_parcela: valorParcela,
        });
      }
    }

    // Processar produtos vendidos
    for (const produto of produtos) {
      const { codigo_barras, quantidade_estoque } = produto;

      // Busca o produto no estoque
      const itemEstoque = await Estoque.findOne({ where: { codigo_barras } });
      if (!itemEstoque) {
        throw new Error(
          `Produto com código ${codigo_barras} não encontrado no estoque.`
        );
      }

      if (itemEstoque.quantidade_estoque < quantidade_estoque) {
        throw new Error(
          `Estoque insuficiente para o produto ${itemEstoque.nome_produto}.`
        );
      }

      // Atualiza a quantidade no estoque
      const novaQuantidade =
        itemEstoque.quantidade_estoque - quantidade_estoque;
      await Estoque.update(
        { quantidade_estoque: novaQuantidade },
        { where: { codigo_barras } }
      );

      // Verifica se é necessário gerar um pedido
      if (novaQuantidade <= itemEstoque.quantidade_minima) {
        const fornecedor = await Fornecedor.findOne({
          where: { cnpj: itemEstoque.fornecedor_id },
        });

        if (!fornecedor) {
          throw new Error(
            `Fornecedor do produto ${itemEstoque.nome_produto} não encontrado.`
          );
        }

        const quantidadeReposicao =
          itemEstoque.quantidade_maxima - novaQuantidade;

        // Cria o pedido automaticamente
        await Pedido.create({
          fornecedor_id: fornecedor.cnpj,
          telefone: fornecedor.telefone,
          produtos: JSON.stringify([
            {
              codigo_barras,
              quantidade: quantidadeReposicao,
              preco_custo: itemEstoque.preco_custo,
            },
          ]),
          valor_total: quantidadeReposicao * itemEstoque.preco_custo,
        });

        // Atualiza o estoque para a quantidade máxima
        await Estoque.update(
          { quantidade_estoque: itemEstoque.quantidade_maxima },
          { where: { codigo_barras } }
        );
      }
    }

    // Cria a venda no banco de dados
    const novaVenda = await Venda.create({
      cliente_id,
      endereco_entrega,
      produtos,
      valor_total,
      tipo_pagamento,
      parcelas: tipo_pagamento === "cartão de crédito" ? parcelas : 1,
      data_venda: new Date(),
    });

    return novaVenda;
  },

  // Retornar todas as vendas
  getAll: () => vendasRepository.findAll(),

  // Retornar uma venda específica pelo ID
  getById: (id) => vendasRepository.findById(id),

  // Atualizar uma venda
  update: async (id, data) => {
    // Opcional: Adicione validações específicas se necessário
    return await vendasRepository.update(id, data);
  },

  // Excluir uma venda
  delete: (id) => vendasRepository.delete(id),
};

module.exports = vendasService;
