import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const FornecedoresPage = () => {
  const { authToken } = useContext(AuthContext);
  const [fornecedores, setFornecedores] = useState([]);
  const [novoFornecedor, setNovoFornecedor] = useState({
    cnpj: "",
    razao_social: "",
    endereco: "",
    email: "",
    numero_parcelas: 1,
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

    fetchFornecedores();
  }, [authToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5050/fornecedores", novoFornecedor, {
        headers: { Authorization: `${authToken}` },
      });
      alert("Fornecedor cadastrado com sucesso!");
      setNovoFornecedor({
        cnpj: "",
        razao_social: "",
        endereco: "",
        email: "",
        numero_parcelas: 1,
      });
      setMensagemErro("");
      // Atualizar lista de fornecedores
      const response = await axios.get("http://localhost:5050/fornecedores", {
        headers: { Authorization: `${authToken}` },
      });
      setFornecedores(response.data);
    } catch (error) {
      console.error("Erro ao cadastrar fornecedor:", error);
      setMensagemErro(
        error.response?.data?.message || "Erro ao cadastrar fornecedor."
      );
    }
  };

  const handleDelete = async (cnpj) => {
    try {
      await axios.delete(`http://localhost:5050/fornecedores/${cnpj}`, {
        headers: { Authorization: `${authToken}` },
      });
      alert("Fornecedor excluído com sucesso!");
      setFornecedores(fornecedores.filter((f) => f.cnpj !== cnpj));
    } catch (error) {
      console.error("Erro ao excluir fornecedor:", error);
      setMensagemErro(
        error.response?.data?.message || "Erro ao excluir fornecedor."
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gerenciar Fornecedores</h1>
      {mensagemErro && <p style={{ color: "red" }}>{mensagemErro}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>CNPJ:</label>
          <input
            type="text"
            value={novoFornecedor.cnpj}
            onChange={(e) =>
              setNovoFornecedor({ ...novoFornecedor, cnpj: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Razão Social:</label>
          <input
            type="text"
            value={novoFornecedor.razao_social}
            onChange={(e) =>
              setNovoFornecedor({
                ...novoFornecedor,
                razao_social: e.target.value,
              })
            }
            required
          />
        </div>
        <div>
          <label>Endereço:</label>
          <input
            type="text"
            value={novoFornecedor.endereco}
            onChange={(e) =>
              setNovoFornecedor({ ...novoFornecedor, endereco: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={novoFornecedor.email}
            onChange={(e) =>
              setNovoFornecedor({ ...novoFornecedor, email: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Total de Parcelas:</label>
          <input
            type="number"
            min="1"
            value={novoFornecedor.numero_parcelas}
            onChange={(e) =>
              setNovoFornecedor({
                ...novoFornecedor,
                numero_parcelas: parseInt(e.target.value, 10) || 1,
              })
            }
            required
          />
        </div>
        <button type="submit">Cadastrar Fornecedor</button>
      </form>
      <h2>Lista de Fornecedores</h2>
      <ul>
        {fornecedores.map((fornecedor) => (
          <li key={fornecedor.cnpj}>
            <p>
              <strong>Razão Social:</strong> {fornecedor.razao_social}
            </p>
            <p>
              <strong>CNPJ:</strong> {fornecedor.cnpj}
            </p>
            <p>
              <strong>Endereço:</strong> {fornecedor.endereco}
            </p>
            <p>
              <strong>Email:</strong> {fornecedor.email}
            </p>
            <p>
              <strong>Total de Parcelas:</strong> {fornecedor.numero_parcelas}
            </p>
            <button onClick={() => handleDelete(fornecedor.cnpj)}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FornecedoresPage;
