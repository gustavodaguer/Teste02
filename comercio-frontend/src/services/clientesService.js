import axios from "axios";

const API_URL = "http://localhost:5050/clientes";

export const getClientes = async (token) => {
  return await axios.get(API_URL, {
    headers: { Authorization: `${token}` },
  });
};

export const createCliente = async (cliente, token) => {
  return await axios.post(API_URL, cliente, {
    headers: { Authorization: `${token}` },
  });
};

export const updateCliente = async (id, cliente, token) => {
  return await axios.put(`${API_URL}/${id}`, cliente, {
    headers: { Authorization: `${token}` },
  });
};

export const deleteCliente = async (id, token) => {
  return await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `${token}` },
  });
};
