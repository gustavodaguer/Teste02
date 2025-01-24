import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext); // Informações do usuário e logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Verifica as permissões do usuário
  const isAdmin = user?.role === "Admin";
  const isManager = user?.role === "Gerente";
  const isCashier = user?.role === "Caixa";

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Bem-vindo(a) à Dashboard</h1>
      <h2>Usuário: {user?.username}</h2>
      <h3>Função: {user?.role}</h3>

      <div style={{ marginTop: "20px" }}>
        <h2>Funcionalidades</h2>
        <ul>
          {/* Funcionalidades disponíveis para todos */}
          <li onClick={() => navigate("/clientes")} style={styles.link}>
            Gerenciar Clientes
          </li>
          <li onClick={() => navigate("/vendas")} style={styles.link}>
            Registrar Vendas
          </li>

          {/* Funcionalidades para Gerente e Admin */}
          {(isManager || isAdmin) && (
            <>
              <li onClick={() => navigate("/estoque")} style={styles.link}>
                Gerenciar Estoque
              </li>
              <li
                onClick={() => navigate("/contas-a-receber")}
                style={styles.link}
              >
                Contas a Receber
              </li>
              <li
                onClick={() => navigate("/contas-a-pagar")}
                style={styles.link}
              >
                Contas a Pagar
              </li>
            </>
          )}

          {/* Funcionalidades exclusivas para Admin */}
          {isAdmin && (
            <>
              <li onClick={() => navigate("/fornecedores")} style={styles.link}>
                Gerenciar Fornecedores
              </li>
              <li onClick={() => navigate("/pedidos")} style={styles.link}>
                Gerenciar Pedidos
              </li>
            </>
          )}
        </ul>
      </div>

      <button onClick={handleLogout} style={styles.logoutButton}>
        Sair
      </button>
    </div>
  );
};

const styles = {
  link: {
    color: "#007BFF",
    cursor: "pointer",
    marginBottom: "10px",
    textDecoration: "underline",
  },
  logoutButton: {
    marginTop: "20px",
    backgroundColor: "#ff4d4f",
    color: "white",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "16px",
  },
};

export default Dashboard;
