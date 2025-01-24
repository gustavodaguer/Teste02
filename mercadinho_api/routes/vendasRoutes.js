const express = require("express");
const vendasController = require("../controllers/vendasController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["Admin", "Caixa"]),
  vendasController.create
);
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["Admin", "Gerente", "Caixa"]),
  vendasController.getAll
);
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["Admin", "Gerente", "Caixa"]),
  vendasController.getById
);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["Admin", "Gerente"]),
  vendasController.update
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["Admin"]),
  vendasController.delete
);

module.exports = router;
