import mongoose from 'mongoose';
import dotenv from 'dotenv';

//Preparamos para poder usar variables de entorno
dotenv.config({ path: './.env' });

//Definimos la función de conexión con la base de datos
const conectarBD = async () => {
	return await mongoose.connect(process.env.DATABASE_URL)
		.then(() => {
			console.log('Conexion exitosa a la base de datos');
		})
		.catch((e) => {
			console.error('Error conectando a la base de datos', e);
		});
};

//Exportamos la función creada
export { conectarBD };