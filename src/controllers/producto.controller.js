const productoModel = require("../models/producto.model");

const index = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;
    const productos = await productoModel
      .find({ deleted: false })
      .skip(skip)
      .limit(limit);

    let response = {
      message: "se obtuvieron correctamente los productos",
      data: productos,
    };

    if (page && limit) {
      const totalProductos = await productoModel.countDocuments({
        deleted: false,
      });
      const totalPages = Math.ceil(totalProductos / limit);

      response = {
        ...response,
        total: totalProductos,
        totalPages,
      };
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al obtener los productos",
      error: error.message,
    });
  }
};

const create = async (req, res) => {
  try {
    let producto = new productoModel({
      nombre: req.body.nombre,
      precio: req.body.precio,
      stock: req.body.stock,
    });

    await producto.save();

    return res.status(201).json({
      mensaje: "producto creado exitosamente!",
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "no se pudo crear el producto",
      error: error.message,
    });
  }
};

// /usuarios/:id
const getById = async (req, res) => {
  try {
    const productoId = req.params.id;
    const producto = await productoModel.findById(productoId);

    if (!producto) {
      return res.status(404).json({
        message: "producto no encontrado",
      });
    }

    return res.status(200).json({
      message: "se obtuvo el producto correctamente",
      producto,
    });
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al obtener el producto",
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const productoId = req.params.id;
    const datosActualizar = {
      nombre: req.body.nombre || null,
      precio: req.body.email || null,
      stock: req.body.password || null,
      updated_at: new Date(),
    };

    const productoActualizado = await productoModel.findByIdAndUpdate(
      productoId,
      datosActualizar
    );

    if (!productoActualizado) {
      return res.status(404).json({
        message: "producto no encontrado",
      });
    }

    return res.status(200).json({
      message: "producto actualizado exitosamente",
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "no se pudo actualizar el producto",
      error: error.message,
    });
  }
};

// usuarios/:id
const deleteF = async (req, res) => {
  try {
    const productoId = req.params.id;
    const productoEliminado = await productoModel.findByIdAndDelete(productoId);

    if (!productoEliminado) {
      return res.status(404).json({
        message: "producto no encontrado",
      });
    }

    return res.status(200).json({
      message: "producto eliminado exitosamente",
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "no se pudo eliminar el producto",
      error: error.message,
    });
  }
};

module.exports = {
  index,
  getById,
  create,
  deleteF,
  update,
};
