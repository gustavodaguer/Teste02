import React, { useState, useEffect, useContext } from "react";
import { getContasReceber } from "../services/contasReceberService";
import AuthContext from "../context/AuthContext";

const ContasReceberPage = () => {
  const { authToken } = useContext(AuthContext);
  const [contas, setContas] = useState([]);

  const fetchContas = async () => {
    const response = await getContasReceber(authToken);
    setContas(response.data);
  };

  useEffect(() => {
    fetchContas();
  }, [authToken]);

  return (
    <div>
      <h2>Contas a Receber</h2>
      <ul>
        {contas.map((conta) => (
          <li key={conta.id}>
            Cliente: {conta.cliente_id} - Vencimento: {conta.data_vencimento} -
            Valor: {conta.valor_parcela}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContasReceberPage;
