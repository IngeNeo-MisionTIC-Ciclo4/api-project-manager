import { gql } from 'apollo-server-express';
import { ApolloServer } from 'apollo-server-express';
import { conectarBD } from './src/db/database.js';
import { types } from './src/graphql/types.js';
import { resolvers } from './src/graphql/resolvers.js';
import dotenv from 'dotenv';
import assert from 'assert';

dotenv.config();
async () => {
	await conectarBD();
};

const servidor = new ApolloServer({
	typeDefs: types,
	resolvers: resolvers,
});

it('crear usuarios', async () => {
	const result = await servidor.executeOperation({
		query: gql`
			mutation CrearUsuario(
				$cedula: String!
				$nombres: String!
				$apellidos: String!
				$correo: String!
				$tusuario: Enum_Tusuario!
				$password: String
			) {
				crearUsuario(
					cedula: $cedula
					nombres: $nombres
					apellidos: $apellidos
					correo: $correo
					tusuario: $tusuario
					password: $password
				) {
					correo
				}
			}
		`,
		variables: {
			cedula: 'prueba',
			nombres: 'prueba',
			apellidos: 'prueba',
			correo: 'prueba@estudiante.com',
			tusuario: 'Estudiante',
			password: 'prueba',
		},
	});

	assert.equal(result.data.crearUsuario.correo, 'prueba@estudiante.com');
});

/* it('fetches user', async () => {
	const result = await server.executeOperation({
		query: gql`
			query Usuarios($filtro: FiltroUsuarios) {
				Usuarios(filtro: $filtro) {
					correo
				}
			}
		`,
		variables: {
			filtro: {
				correo: 'testing@testing.com',
			},
		},
	});

	assert.equal(result.data.Usuarios.length, 1);

	assert.equal(result.data.Usuarios[0].correo, 'testing@testing.com');
});

it('deletes user', async () => {
	const result = await server.executeOperation({
		query: gql`
			mutation EliminarUsuario($correo: String) {
				eliminarUsuario(correo: $correo) {
					correo
				}
			}
		`,
		variables: {
			correo: 'testing@testing.com',
		},
	});
	assert.equal(result.data.eliminarUsuario.correo, 'testing@testing.com');
});

it('fetches user after deletion', async () => {
	const result = await server.executeOperation({
		query: gql`
			query Usuarios($filtro: FiltroUsuarios) {
				Usuarios(filtro: $filtro) {
					correo
				}
			}
		`,
		variables: {
			filtro: {
				correo: 'testing@testing.com',
			},
		},
	});

	assert.equal(result.data.Usuarios.length, 0);
}); */
