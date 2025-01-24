import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const VendasPage = () => {
  const { authToken } = useContext(AuthContext);

  const [clientes, setClientes] = useState([]);
  const [produtosDisponiveis, setProdutosDisponiveis] = useState([]);
  const [novaVenda, setNovaVenda] = useState({
    cliente_id: "",
    endereco_entrega: "",
    produtos: [], // Produtos da venda
    valor_total: 0,
    tipo_pagamento: "cartão de crédito",
    parcelas: 1,
  });
  const [novoProduto, setNovoProduto] = useState({
    codigo_barras: "",
    quantidade_estoque: 1,
  });
  const [mensagemErro, setMensagemErro] = useState("");

  useEffect(() => {
    const fetchClientes = async () => {
      const response = await axios.get("http://localhost:5050/clientes", {
        headers: { Authorization: `${authToken}` },
      });
      setClientes(response.data);
    };

    const fetchProdutos = async () => {
      const response = await axios.get("http://localhost:5050/estoque", {
        headers: { Authorization: `${authToken}` },
      });
      setProdutosDisponiveis(response.data);
    };

    fetchClientes();
    fetchProdutos();
  }, [authToken]);

  const handleAdicionarProduto = () => {
    const produto = produtosDisponiveis.find(
      (p) => p.codigo_barras === novoProduto.codigo_barras
    );

    if (!produto) {
      setMensagemErro("Produto não encontrado.");
      return;
    }

    if (novoProduto.quantidade_estoque > produto.quantidade_estoque) {
      setMensagemErro("Quantidade insuficiente no estoque.");
      return;
    }

    const valorProduto = produto.preco_venda * novoProduto.quantidade_estoque;

    setNovaVenda((prevVenda) => ({
      ...prevVenda,
      produtos: [
        ...prevVenda.produtos,
        { ...novoProduto, valor_unitario: produto.preco_venda },
      ],
      valor_total: prevVenda.valor_total + valorProduto,
    }));

    setNovoProduto({ codigo_barras: "", quantidade_estoque: 1 });
    setMensagemErro("");
  };

  const handleRemoverProduto = (codigo_barras) => {
    setNovaVenda((prevVenda) => {
      const produtoRemovido = prevVenda.produtos.find(
        (produto) => produto.codigo_barras === codigo_barras
      );

      if (!produtoRemovido) return prevVenda;

      const valorProduto =
        produtoRemovido.valor_unitario * produtoRemovido.quantidade_estoque;

      return {
        ...prevVenda,
        produtos: prevVenda.produtos.filter(
          (produto) => produto.codigo_barras !== codigo_barras
        ),
        valor_total: prevVenda.valor_total - valorProduto,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5050/vendas", novaVenda, {
        headers: { Authorization: `${authToken}` },
      });
      alert("Venda cadastrada com sucesso!");
      setNovaVenda({
        cliente_id: "",
        endereco_entrega: "",
        produtos: [],
        valor_total: 0,
        tipo_pagamento: "cartão de crédito",
        parcelas: 1,
      });
      setMensagemErro("");
    } catch (error) {
      console.error("Erro ao cadastrar venda:", error);
      setMensagemErro(
        error.response?.data?.message || "Erro ao cadastrar venda."
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cadastrar Venda</h1>
      {mensagemErro && <p style={{ color: "red" }}>{mensagemErro}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Cliente:</label>
          <select
            value={novaVenda.cliente_id}
            onChange={(e) =>
              setNovaVenda({ ...novaVenda, cliente_id: e.target.value })
            }
          >
            <option value="">Selecione um cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.cpf} value={cliente.cpf}>
                {cliente.nome} (Crédito: {cliente.credito})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Endereço de Entrega:</label>
          <input
            type="text"
            value={novaVenda.endereco_entrega}
            onChange={(e) =>
              setNovaVenda({ ...novaVenda, endereco_entrega: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Tipo de Pagamento:</label>
          <select
            value={novaVenda.tipo_pagamento}
            onChange={(e) =>
              setNovaVenda({ ...novaVenda, tipo_pagamento: e.target.value })
            }
          >
            <option value="cartão de crédito">Cartão de Crédito</option>
            <option value="cartão de débito">Cartão de Débito</option>
            <option value="pix">Pix</option>
            <option value="loja">Loja</option>
          </select>
        </div>
        {novaVenda.tipo_pagamento === "cartão de crédito" && (
          <div>
            <label>Parcelas:</label>
            <input
              type="number"
              min="1"
              value={novaVenda.parcelas}
              onChange={(e) =>
                setNovaVenda({
                  ...novaVenda,
                  parcelas: parseInt(e.target.value, 10) || 1,
                })
              }
              required
            />
          </div>
        )}
        <div>
          <h2>Adicionar Produtos</h2>
          <select
            value={novoProduto.codigo_barras}
            onChange={(e) =>
              setNovoProduto({ ...novoProduto, codigo_barras: e.target.value })
            }
          >
            <option value="">Selecione um produto</option>
            {produtosDisponiveis.map((produto) => (
              <option key={produto.codigo_barras} value={produto.codigo_barras}>
                {produto.nome_produto} (Estoque: {produto.quantidade_estoque})
              </option>
            ))}
          </select>
          <input
            type="number"
            min="1"
            value={novoProduto.quantidade_estoque}
            onChange={(e) =>
              setNovoProduto({
                ...novoProduto,
                quantidade_estoque: parseInt(e.target.value, 10) || 1,
              })
            }
          />
          <button type="button" onClick={handleAdicionarProduto}>
            Adicionar Produto
          </button>
        </div>
        <div>
          <h2>Produtos Selecionados</h2>
          <ul>
            {novaVenda.produtos.map((produto) => (
              <li key={produto.codigo_barras}>
                {produto.codigo_barras} - Quantidade:{" "}
                {produto.quantidade_estoque} - Valor Unitário: R${" "}
                {Number(produto.valor_unitario).toFixed(2)} - Subtotal: R${" "}
                {(produto.valor_unitario * produto.quantidade_estoque).toFixed(
                  2
                )}
                <button
                  type="button"
                  onClick={() => handleRemoverProduto(produto.codigo_barras)}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
          <p>
            <strong>Valor Total:</strong> R${" "}
            {Number(novaVenda.valor_total).toFixed(2)}
          </p>
        </div>
        <button type="submit">Cadastrar Venda</button>
      </form>
    </div>
  );
};

export default VendasPage;
