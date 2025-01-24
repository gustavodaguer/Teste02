import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ClientesPage from "./pages/ClientesPage";
import VendasPage from "./pages/VendasPage";
import EstoquePage from "./pages/EstoquePage";
import ContasReceberPage from "./pages/ContasReceberPage";
import ContasPagarPage from "./pages/ContasPagarPage";
import FornecedoresPage from "./pages/FornecedoresPage";
import PedidosPage from "./pages/PedidosPage";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/clientes"
            element={
              <PrivateRoute>
                <ClientesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/vendas"
            element={
              <PrivateRoute>
                <VendasPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/estoque"
            element={
              <PrivateRoute>
                <EstoquePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/contas-a-receber"
            element={
              <PrivateRoute>
                <ContasReceberPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/contas-a-pagar"
            element={
              <PrivateRoute>
                <ContasPagarPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/fornecedores"
            element={
              <PrivateRoute>
                <FornecedoresPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/pedidos"
            element={
              <PrivateRoute>
                <PedidosPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
