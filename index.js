import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { conectarBD } from './src/db/database.js';
import { ModeloUsuario } from './src/models/usuario/usuario.js';
import { ModeloProyecto } from './src/models/proyecto/proyecto.js';
import { ModeloInscripcion } from './src/models/inscripcion/inscripcion.js';
import { ModeloAvance } from './src/models/avance/avance.js';

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

//Creamos una función para la creación de un nuevo usuario usando el Modelo creado en Mongoose
const crearUsuario = async () => {
	const usuario = await ModeloUsuario.create({
		cedula: '80975116',
		nombres: 'Roger Alexis',
		apellidos: 'Valencia Garcia',
		correo: 'inge@ingecorp.com',
		tusuario: 'Administrador',
		estado: 'Autorizado'
	})
};

//Creamos una función para la creación de un proyecto usando el Modelo creado en Mongoose
const crearProyecto = async () => {
	const proyecto = await ModeloProyecto.create({
		nombreproyecto: 'Proyecto Prueba',
		objetivogeneral: 'Comprobar Esquema',
		objetivoespecifico: 'Probar la creación',
		presupuesto: 500000,
		fechaInicio: '2021-11-18',
		fechaFin: '2021-11-19',
		lider: '619724cd5539b65593467eed',
		estado: 'Activo',
		fase: 'Iniciado'
	})
};

//Creamos una función para la creación de una incripción aun proyecto ya creado anteriormente, usando el Modelo creado en Mongoose
const crearInscripcion = async () => {
	const agregarInscripcion = await ModeloInscripcion.create({
		estado: 'Pendiente',
		FechaIngreso: '2021-11-18',
		FechaEgreso: '2022-11-18',
		proyecto: '619726633566e9aef7e5d7c9',
		estudiante: '6197278c52da0ae7853020de'
	})
};

//Creamos una función para la agregar un avance al proyecto, usando el Modelo creado en Mongoose
const crearAvance = async () => {
	const avance = await ModeloAvance.create({
		proyecto: '619726633566e9aef7e5d7c9',
		descripcion: 'Avance de Prueba',
		fechaAvance: Date.now(),
		observaciones: 'Se reviso el avance, muy bien',
		estudiante: '6197278c52da0ae7853020de'
	})
};

//crearUsuario();
//crearProyecto();
//crearInscripcion();
//crearAvance();

//Nos conectamos al base datos
const main = async () => {
	await conectarBD();
};

//Iniciar el servidor
main();
