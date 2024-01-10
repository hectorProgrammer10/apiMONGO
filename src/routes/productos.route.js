const express = require("express");
const productosController = require("../controllers/producto.controller");
const router = express.Router();

router.get("/", productosController.index);
router.get("/:id", productosController.getById);
router.post("/", productosController.create);
router.delete("/:id", productosController.deleteF);
router.put("/:id", productosController.update);

module.exports = router;
