const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario"); // Importa o modelo User (certifique-se de que está correto)

const router = express.Router();

// Rota de login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Validação inicial
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Nome de usuário e senha são obrigatórios." });
  }

  try {
    console.log("Tentando autenticar o usuário:", username);

    // Busca o usuário no banco de dados
    const user = await Usuario.findOne({ where: { username } });
    if (!user) {
      console.log("Usuário não encontrado.");
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    // Verifica se a senha é válida
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Senha inválida.");
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    // Gera o token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      "seu-segredo-jwt", // Substitua por um segredo seguro em produção
      { expiresIn: "1h" }
    );

    console.log("Usuário autenticado com sucesso:", username);

    // Retorna o token ao cliente
    res.json({ token });
  } catch (error) {
    console.error("Erro ao tentar fazer login:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
});

module.exports = router;
