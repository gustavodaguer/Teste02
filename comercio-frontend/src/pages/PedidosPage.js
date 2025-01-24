import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const PedidosPage = () => {
  const { authToken } = useContext(AuthContext);

  const [fornecedores, setFornecedores] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [novoPedido, setNovoPedido] = useState({
    fornecedor_id: "",
    produtos: [],
    valor_total: 0,
  });
  const [novoProduto, setNovoProduto] = useState({
    codigo_barras: "",
    nome_produto: "",
    unidade_medida: "",
    quantidade_estoque: 0,
    preco_custo: 0,
    preco_venda: 0,
    promocao: 0,
    quantidade_minima: 0,
    quantidade_maxima: 0,
  });
  const [mensagemErro, setMensagemErro] = useState("");

  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const response = await axios.get("http://localhost:5050/fornecedores", {
          headers: { Authorization: `${authToken}` },
        });
        setFornecedores(response.data);
      } catch (error) {
        console.error("Erro ao buscar fornecedores:", error);
        setMensagemErro("Erro ao buscar fornecedores.");
      }
    };

    const fetchPedidos = async () => {
      try {
        const response = await axios.get("http://localhost:5050/pedidos", {
          headers: { Authorization: `${authToken}` },
        });
        setPedidos(response.data);
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
        setMensagemErro("Erro ao buscar pedidos.");
      }
    };

    fetchFornecedores();
    fetchPedidos();
  }, [authToken]);

  const handleAdicionarProduto = () => {
    const {
      quantidade_estoque,
      preco_custo,
      quantidade_minima,
      quantidade_maxima,
    } = novoProduto;

    // Validações básicas para o produto
    if (
      !novoProduto.codigo_barras ||
      !novoProduto.nome_produto ||
      !novoProduto.unidade_medida
    ) {
      setMensagemErro("Preencha todos os campos obrigatórios do produto.");
      return;
    }
    if (quantidade_estoque <= 0 || preco_custo <= 0) {
      setMensagemErro(
        "Quantidade e preço de custo devem ser maiores que zero."
      );
      return;
    }
    if (quantidade_minima > quantidade_maxima) {
      setMensagemErro("Quantidade mínima não pode ser maior que a máxima.");
      return;
    }

    // Adiciona o produto ao pedido
    setNovoPedido((prevPedido) => ({
      ...prevPedido,
      produtos: [...prevPedido.produtos, { ...novoProduto }],
      valor_total: prevPedido.valor_total + quantidade_estoque * preco_custo,
    }));
    setNovoProduto({
      codigo_barras: "",
      nome_produto: "",
      unidade_medida: "",
      quantidade_estoque: 0,
      preco_custo: 0,
      preco_venda: 0,
      promocao: 0,
      quantidade_minima: 0,
      quantidade_maxima: 0,
    });
    setMensagemErro("");
  };

  const handleRemoverProduto = (codigo_barras) => {
    setNovoPedido((prevPedido) => {
      const produtoRemovido = prevPedido.produtos.find(
        (produto) => produto.codigo_barras === codigo_barras
      );

      if (!produtoRemovido) return prevPedido;

      return {
        ...prevPedido,
        produtos: prevPedido.produtos.filter(
          (produto) => produto.codigo_barras !== codigo_barras
        ),
        valor_total:
          prevPedido.valor_total -
          produtoRemovido.quantidade_estoque * produtoRemovido.preco_custo,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!novoPedido.fornecedor_id || novoPedido.produtos.length === 0) {
      setMensagemErro("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      await axios.post("http://localhost:5050/pedidos", novoPedido, {
        headers: { Authorization: `${authToken}` },
      });
      alert("Pedido cadastrado com sucesso!");
      setNovoPedido({
        fornecedor_id: "",
        produtos: [],
        valor_total: 0,
      });
      setMensagemErro("");

      // Atualizar lista de pedidos
      const response = await axios.get("http://localhost:5050/pedidos", {
        headers: { Authorization: `${authToken}` },
      });
      setPedidos(response.data);
    } catch (error) {
      console.error("Erro ao cadastrar pedido:", error);
      setMensagemErro(
        error.response?.data?.message || "Erro ao cadastrar pedido."
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gerenciar Pedidos</h1>
      {mensagemErro && <p style={{ color: "red" }}>{mensagemErro}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Fornecedor:</label>
          <select
            value={novoPedido.fornecedor_id}
            onChange={(e) =>
              setNovoPedido({ ...novoPedido, fornecedor_id: e.target.value })
            }
            required
          >
            <option value="">Selecione um fornecedor</option>
            {fornecedores.map((fornecedor) => (
              <option key={fornecedor.cnpj} value={fornecedor.cnpj}>
                {fornecedor.razao_social}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h2>Adicionar Produtos</h2>
          <label>Código de Barras:</label>
          <input
            type="text"
            value={novoProduto.codigo_barras}
            onChange={(e) =>
              setNovoProduto({ ...novoProduto, codigo_barras: e.target.value })
            }
            required
          />
          <label>Nome do Produto:</label>
          <input
            type="text"
            value={novoProduto.nome_produto}
            onChange={(e) =>
              setNovoProduto({ ...novoProduto, nome_produto: e.target.value })
            }
            required
          />
          <label>Unidade de Medida:</label>
          <input
            type="text"
            value={novoProduto.unidade_medida}
            onChange={(e) =>
              setNovoProduto({ ...novoProduto, unidade_medida: e.target.value })
            }
            required
          />
          <label>Quantidade em Estoque:</label>
          <input
            type="number"
            min="0"
            value={novoProduto.quantidade_estoque}
            onChange={(e) =>
              setNovoProduto({
                ...novoProduto,
                quantidade_estoque: parseInt(e.target.value, 10),
              })
            }
            required
          />
          <label>Preço de Custo:</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={novoProduto.preco_custo}
            onChange={(e) =>
              setNovoProduto({
                ...novoProduto,
                preco_custo: parseFloat(e.target.value),
              })
            }
            required
          />
          <label>Preço de Venda:</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={novoProduto.preco_venda}
            onChange={(e) =>
              setNovoProduto({
                ...novoProduto,
                preco_venda: parseFloat(e.target.value),
              })
            }
          />
          <label>Promoção:</label>
          <input
            type="number"
            min="0"
            step="1"
            value={novoProduto.promocao}
            onChange={(e) =>
              setNovoProduto({
                ...novoProduto,
                promocao: parseInt(e.target.value, 10),
              })
            }
          />
          <label>Quantidade Mínima:</label>
          <input
            type="number"
            min="0"
            value={novoProduto.quantidade_minima}
            onChange={(e) =>
              setNovoProduto({
                ...novoProduto,
                quantidade_minima: parseInt(e.target.value, 10),
              })
            }
          />
          <label>Quantidade Máxima:</label>
          <input
            type="number"
            min="0"
            value={novoProduto.quantidade_maxima}
            onChange={(e) =>
              setNovoProduto({
                ...novoProduto,
                quantidade_maxima: parseInt(e.target.value, 10),
              })
            }
          />
          <button type="button" onClick={handleAdicionarProduto}>
            Adicionar Produto
          </button>
        </div>
        <div>
          <h2>Produtos no Pedido</h2>
          <ul>
            {novoPedido.produtos.map((produto) => (
              <li key={produto.codigo_barras}>
                Código: {produto.codigo_barras}, Nome: {produto.nome_produto},{" "}
                Quantidade: {produto.quantidade_estoque}, Preço: R${" "}
                {produto.preco_custo.toFixed(2)}
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
            <strong>Total:</strong> R$ {novoPedido.valor_total.toFixed(2)}
          </p>
        </div>
        <button type="submit">Cadastrar Pedido</button>
      </form>
      <div>
        <h2>Lista de Pedidos</h2>
        <ul>
          {pedidos.map((pedido) => (
            <li key={pedido.id}>
              <p>
                <strong>Fornecedor:</strong> {pedido.fornecedor_id}
              </p>
              <p>
                <strong>Valor Total:</strong> R${" "}
                {Number(pedido.valor_total).toFixed(2)}
              </p>
              <h3>Produtos:</h3>
              <ul>
                {Array.isArray(pedido.produtos)
                  ? pedido.produtos.map((produto, index) => (
                      <li key={index}>
                        Código: {produto.codigo_barras}, Nome:{" "}
                        {produto.nome_produto}, Quantidade:{" "}
                        {produto.quantidade_estoque}, Preço: R$
                        {Number(produto.preco_custo).toFixed(2)}
                      </li>
                    ))
                  : pedido.produtos
                  ? JSON.parse(pedido.produtos).map((produto, index) => (
                      <li key={index}>
                        Código: {produto.codigo_barras}, Nome:{" "}
                        {produto.nome_produto}, Quantidade:{" "}
                        {produto.quantidade_estoque}, Preço: R$
                        {Number(produto.preco_custo).toFixed(2)}
                      </li>
                    ))
                  : "Nenhum produto encontrado"}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PedidosPage;
