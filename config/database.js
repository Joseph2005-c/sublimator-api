import mongoose from 'mongoose';
import colors from 'colors';

// Conecta la aplicación a MongoDB Atlas usando la variable URI del .env
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log('Conectado a la base de datos'.green);
  } catch (error) {
    console.log('Error al conectar a la base de datos:'.red, error.message);
    process.exit(1);
  }
};

// Al finalizar con Ctrl + C se cierra la conexión
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('DB desconectado'.yellow);
  process.exit(0);
});

export default connectDB;