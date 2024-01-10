require("dotenv").config();
require("./src/configs/db.config");

const express = require("express");
const app = express();
const PORT = 3000;

const productosRouter = require("./src/routes/productos.route");

app.use(express.json());
app.use("/productos", productosRouter);

app.listen(PORT, () => {
  console.log("API escuchando en el puerto " + PORT);
});
