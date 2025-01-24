const express = require("express");
const contasPagarController = require("../controllers/contasPagarController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["Admin"], "Gerente"),
  contasPagarController.create
);
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["Admin", "Gerente", "Caixa"]),
  contasPagarController.getAll
);
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["Admin", "Gerente", "Caixa"]),
  contasPagarController.getById
);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["Admin", "Gerente"]),
  contasPagarController.update
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["Admin", "Gerente"]),
  contasPagarController.delete
);

module.exports = router;
