const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/tienda")
  .then(() => console.log("conectado a mongodb exitosamente"))
  .catch(console.log);
// catch((e) => console.log(e));
