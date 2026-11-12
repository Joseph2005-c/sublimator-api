import dotenv from 'dotenv';
import colors from 'colors';
import app from './app.js';
import connectDB from './config/database.js';

// Carga las variables del archivo .env
dotenv.config();

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
  // Primero se conecta a la base de datos y luego inicia el servidor
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Servidor Sublimator corriendo en el puerto ${PORT}`.yellow);
  });
};

iniciarServidor();