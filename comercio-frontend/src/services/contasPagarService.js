import axios from "axios";

const API_URL = "http://localhost:5050/contas-a-pagar";

export const getContasPagar = async (token) => {
  return await axios.get(API_URL, {
    headers: { Authorization: `${token}` },
  });
};
