import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { conectarBD } from './src/db/database.js';
import { types } from './src/graphql/types.js';
import { resolvers } from './src/graphql/resolvers.js';

//Nos permite usar los archivos .env para tener las rutas en otro lado no visibles en el repo
dotenv.config({ path: './.env' });

//Definimos el puerto a usar en el servidor
const port = process.env.PORT || 5050;

//Definimos el servidor de Apollo para trabajar con GraphQL
const server = new ApolloServer({
	typeDefs: types,
	resolvers: resolvers,
});

// Nos permite usar express como servidor
const app = express();

//Permite tomar las perticiones como tipo Json
app.use(express.json());

//Es el Middleware para permitir peticiones desde cualqueir ubicación
app.use(cors());

//Inicamos el servidor con la conexión a la base de datos
app.listen({ port: process.env.PORT || 5050 }, async () => {

	//Nos conectamos la base de datos
	await conectarBD();
	//Iniciamos el servidor de Apollo
	await server.start();

	//Indicamos a apollo que use los Middleware de Express y nuestra App
	server.applyMiddleware({ app });

	console.log(`Servidor de GraphQl-Express Escuchando en el puerto ${port}`);
});