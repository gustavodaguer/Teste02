const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "Token não fornecido" });

  jwt.verify(token, "seu-segredo-jwt", (err, decoded) => {
    if (err) return res.status(401).json({ message: err.message, token });
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
