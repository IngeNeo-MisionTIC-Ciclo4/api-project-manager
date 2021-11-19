
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { conectarBD } from './src/db/database';


//Nos permite usar los archivos .env para tener las rutas en otro lado no visibles en el repo
dotenv.config({ path: './.env' });

//Definimos el puerto a usar en el servidor
const port = process.env.PORT || 5050;

// Nos permite usar express como servidor
const app = express();

//Permite tomar las perticiones como tipo Json
app.use(express.json());

//Es el Middleware para permitir peticiones desde cualqueir ubicación
app.use(cors());


//Nos conectamos al base datos
const main = async () => {
	await conectarBD();
};

//Iniciar el servidor
main();
