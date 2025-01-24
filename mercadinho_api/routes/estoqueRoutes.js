const express = require("express");
const estoqueController = require("../controllers/estoqueController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["Admin", "Gerente"]),
  estoqueController.create
);
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["Admin", "Gerente", "Caixa"]),
  estoqueController.getAll
);
router.get(
  "/:codigo_barras",
  authMiddleware,
  roleMiddleware(["Admin", "Gerente", "Caixa"]),
  estoqueController.getById
);
router.put(
  "/:codigo_barras",
  authMiddleware,
  roleMiddleware(["Admin", "Gerente"]),
  estoqueController.update
);
router.delete(
  "/:codigo_barras",
  authMiddleware,
  roleMiddleware(["Admin", "Gerente"]),
  estoqueController.delete
);

module.exports = router;
