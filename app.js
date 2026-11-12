import express from 'express';
import cors from 'cors';
import productoRoutes from './routes/producto.routes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({ message: 'Sublimator API funcionando' });
});

// Rutas de la API
app.use('/api/productos', productoRoutes);

// Cualquier ruta no definida
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

export default app;