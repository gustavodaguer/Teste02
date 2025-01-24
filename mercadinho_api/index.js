const express = require("express");
const cors = require("cors");
const clienteRoutes = require("./routes/clienteRoutes");
const fornecedorRoutes = require("./routes/fornecedorRoutes");
const estoqueRoutes = require("./routes/estoqueRoutes");
const vendasRoutes = require("./routes/vendasRoutes");
const contasReceberRoutes = require("./routes/contasReceberRoutes");
const pedidoRoutes = require("./routes/pedidoRoutes");
const contasPagarRoutes = require("./routes/contasPagarRoutes");
const authRoutes = require("./routes/AuthRoutes");
const sequelize = require("./config/database"); // Importa configuração do Sequelize

const app = express();
app.use(express.json());

app.use(cors());

app.get("/test", (req, res) => {
  res.json({ message: "Rota de teste funcionando!" });
});

app.use((req, res, next) => {
  console.log(`Requisição recebida: ${req.method} ${req.url}`);
  next();
});
// Rotas
app.use(authRoutes);
app.use("/clientes", clienteRoutes);
app.use("/fornecedores", fornecedorRoutes);
app.use("/estoque", estoqueRoutes);
app.use("/vendas", vendasRoutes);
app.use("/contas-a-receber", contasReceberRoutes);
app.use("/pedidos", pedidoRoutes);
app.use("/contas-a-pagar", contasPagarRoutes);

const PORT = process.env.PORT || 3000;

// Conexão com o banco e sincronização
sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado ao banco de dados com sucesso.");
    return sequelize.sync({ alter: true }); // Sincroniza modelos com o banco
  })
  .then(() => {
    console.log("Modelos sincronizados com sucesso.");
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });
