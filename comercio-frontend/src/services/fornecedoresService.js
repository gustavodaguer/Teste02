import axios from "axios";

const API_URL = "http://localhost:5050/fornecedores";

export const getFornecedores = async (token) => {
  return await axios.get(API_URL, {
    headers: { Authorization: `${token}` },
  });
};

export const createFornecedor = async (fornecedor, token) => {
  return await axios.post(API_URL, fornecedor, {
    headers: { Authorization: `${token}` },
  });
};
