import React, { useState, useEffect, useContext } from "react";
import { getContasPagar } from "../services/contasPagarService";
import AuthContext from "../context/AuthContext";

const ContasPagarPage = () => {
  const { authToken } = useContext(AuthContext);
  const [contas, setContas] = useState([]);

  const fetchContas = async () => {
    const response = await getContasPagar(authToken);
    setContas(response.data);
  };

  useEffect(() => {
    fetchContas();
  }, [authToken]);

  return (
    <div>
      <h2>Contas a Pagar</h2>
      <ul>
        {contas.map((conta) => (
          <li key={conta.id}>
            Fornecedor: {conta.fornecedor_id} - Vencimento:{" "}
            {conta.data_vencimento} - Valor: {conta.valor_parcela}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContasPagarPage;
