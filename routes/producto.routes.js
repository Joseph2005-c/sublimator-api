import { Router } from 'express';
import {
  getAllProductos,
  getProductoById,
  postProducto,
  putProducto,
  deleteProducto,
} from '../controllers/producto.controller.js';

const router = Router();

router.get('/', getAllProductos);
router.get('/:id', getProductoById);
router.post('/', postProducto);
router.put('/:id', putProducto);
router.delete('/:id', deleteProducto);

export default router;