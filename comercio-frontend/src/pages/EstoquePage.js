import React, { useState, useEffect, useContext } from "react";
import { getEstoque, updateEstoque } from "../services/estoqueService";
import AuthContext from "../context/AuthContext";

const EstoquePage = () => {
  const { authToken } = useContext(AuthContext);
  const [estoque, setEstoque] = useState([]);

  const fetchEstoque = async () => {
    const response = await getEstoque(authToken);
    setEstoque(response.data);
  };

  useEffect(() => {
    fetchEstoque();
  }, [authToken]);

  return (
    <div>
      <h2>Estoque</h2>
      <ul>
        {estoque.map((item) => (
          <li key={item.codigo_barras}>
            {item.nome_produto} - {item.quantidade_estoque} unidades
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EstoquePage;
