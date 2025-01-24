const express = require("express");
const pedidoController = require("../controllers/pedidoController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["Admin"]),
  pedidoController.create
);
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["Admin", "Gerente", "Caixa"]),
  pedidoController.getAll
);
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["Admin", "Gerente", "Caixa"]),
  pedidoController.getById
);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["Admin", "Gerente"]),
  pedidoController.update
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["Admin"]),
  pedidoController.delete
);

module.exports = router;
