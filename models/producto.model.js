import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
  categoria: {
    type: String,
    required: [true, 'La categoría es obligatoria'],
    enum: {
      values: ['uniformes', 'camisetas', 'tazas', 'pijamas', 'gorras', 'pancartas'],
      message: 'La categoría debe ser: uniformes, camisetas, tazas, pijamas, gorras o pancartas',
    },
  },
  precio: { type: Number, required: [true, 'El precio es obligatorio'], min: [0, 'El precio no puede ser negativo'] },
  descripcion: { type: String, required: false },
  diasEntrega: { type: Number, required: false },
  disponible: { type: Boolean, default: true },
});

// Se guardará en la colección "productos"
const Producto = mongoose.model('Producto', productoSchema);

export default Producto;