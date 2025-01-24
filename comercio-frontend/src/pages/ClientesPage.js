import React, { useState, useEffect, useContext } from "react";
import {
  getClientes,
  createCliente,
  deleteCliente,
} from "../services/clientesService"; // Remova updateCliente

import AuthContext from "../context/AuthContext";

const ClientesPage = () => {
  const { authToken } = useContext(AuthContext);
  const [clientes, setClientes] = useState([]);
  const [newCliente, setNewCliente] = useState({
    cpf: "",
    nome: "",
    endereco: "",
    tipo_cliente: "bronze",
    credito: 0,
  });

  useEffect(() => {
    fetchClientes();
  }, [authToken]);

  const fetchClientes = async () => {
    const response = await getClientes(authToken);
    setClientes(response.data);
  };
  const handleCreate = async () => {
    await createCliente(newCliente, authToken);
    fetchClientes();
    setNewCliente({
      cpf: "",
      nome: "",
      endereco: "",
      tipo_cliente: "bronze",
      credito: 0,
    });
  };

  const handleDelete = async (cpf) => {
    await deleteCliente(cpf, authToken);
    fetchClientes();
  };

  return (
    <div>
      <h2>Clientes</h2>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.cpf}>
            {cliente.nome} - {cliente.cpf} - {cliente.tipo_cliente}
            <button onClick={() => handleDelete(cliente.cpf)}>Deletar</button>
          </li>
        ))}
      </ul>
      <div>
        <h3>Cadastrar Cliente</h3>
        <input
          placeholder="CPF"
          value={newCliente.cpf}
          onChange={(e) =>
            setNewCliente({ ...newCliente, cpf: e.target.value })
          }
        />
        <input
          placeholder="Nome"
          value={newCliente.nome}
          onChange={(e) =>
            setNewCliente({ ...newCliente, nome: e.target.value })
          }
        />
        <input
          placeholder="Endereço"
          value={newCliente.endereco}
          onChange={(e) =>
            setNewCliente({ ...newCliente, endereco: e.target.value })
          }
        />
        <select
          value={newCliente.tipo_cliente}
          onChange={(e) =>
            setNewCliente({ ...newCliente, tipo_cliente: e.target.value })
          }
        >
          <option value="bronze">Bronze</option>
          <option value="prata">Prata</option>
          <option value="ouro">Ouro</option>
        </select>
        <input
          placeholder="Crédito"
          type="number"
          value={newCliente.credito}
          onChange={(e) =>
            setNewCliente({ ...newCliente, credito: e.target.value })
          }
        />
        <button onClick={handleCreate}>Cadastrar</button>
      </div>
    </div>
  );
};

export default ClientesPage;
