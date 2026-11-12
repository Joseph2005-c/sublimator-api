import mongoose from 'mongoose';
import Producto from '../models/producto.model.js';

// GET: todos los productos
export const getAllProductos = async (req, res) => {
  console.log('Obtiene todos los productos');

  try {
    const productos = await Producto.find({}, { __v: 0 });

    if (productos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron productos' });
    }

    return res.status(200).json(productos);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener los productos' });
  }
};

// GET: un producto por ID
export const getProductoById = async (req, res) => {
  console.log('Obtiene producto por ID');

  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'El ID no es válido' });
    }

    const producto = await Producto.findById(id, { __v: 0 });

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    return res.status(200).json(producto);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el producto' });
  }
};

// POST: crear un producto
export const postProducto = async (req, res) => {
  console.log('Crea un producto');

  const body = req.body;

  try {
    const producto = new Producto(body);

    // Validamos antes de guardar
    try {
      await producto.validate();
    } catch (error) {
      const mensajes = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: 'Error de validación', errores: mensajes });
    }

    await producto.save();

    return res.status(201).json(producto);
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear el producto' });
  }
};

// PUT: actualizar un producto
export const putProducto = async (req, res) => {
  console.log('Actualiza un producto');

  const { id } = req.params;
  const body = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'El ID no es válido' });
    }

    // new: true devuelve el registro ya actualizado
    // runValidators: true valida los datos antes de guardar
    const producto = await Producto.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).select({ __v: 0 });

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado o no se actualizó' });
    }

    return res.status(200).json(producto);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const mensajes = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: 'Error de validación', errores: mensajes });
    }
    return res.status(500).json({ message: 'Error al actualizar el producto' });
  }
};

// DELETE: eliminar un producto
export const deleteProducto = async (req, res) => {
  console.log('Elimina un producto');

  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'El ID no es válido' });
    }

    const producto = await Producto.findByIdAndDelete(id).select({ __v: 0 });

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    return res.status(200).json({ message: 'Producto eliminado', producto });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar el producto' });
  }
};