const express = require("express");
const fornecedorController = require("../controllers/fornecedorController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["Admin"]),
  fornecedorController.create
);
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["Admin", "Gerente", "Caixa"]),
  fornecedorController.getAll
);
router.get(
  "/:cnpj",
  authMiddleware,
  roleMiddleware(["Admin", "Gerente", "Caixa"]),
  fornecedorController.getById
);
router.put(
  "/:cnpj",
  authMiddleware,
  roleMiddleware(["Admin", "Gerente"]),
  fornecedorController.update
);
router.delete(
  "/:cnpj",
  authMiddleware,
  roleMiddleware(["Admin"]),
  fornecedorController.delete
);

module.exports = router;
