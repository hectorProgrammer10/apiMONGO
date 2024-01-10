const mongoose = require("mongoose");

const productoSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  updated_at: {
    type: Date,
    default: null,
  },
  deleted: {
    type: Boolean,
    required: false,
    default: false,
  },
  deleted_at: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("producto", productoSchema);
