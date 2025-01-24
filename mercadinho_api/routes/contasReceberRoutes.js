const express = require("express");
const contasReceberController = require("../controllers/contasReceberController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["Admin"]),
  contasReceberController.create
);
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["Admin", "Gerente", "Caixa"]),
  contasReceberController.getAll
);
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["Admin", "Gerente", "Caixa"]),
  contasReceberController.getById
);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["Admin", "Gerente"]),
  contasReceberController.update
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["Admin"]),
  contasReceberController.delete
);

module.exports = router;
