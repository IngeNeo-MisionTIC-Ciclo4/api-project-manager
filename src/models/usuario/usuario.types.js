import { gql } from 'apollo-server-express';

const tiposUsuario = gql`

	input camposUsuario {
		cedula: String
		nombres: String
		apellidos: String
		correo: String
		tusuario: Enum_Rol
		estado: Enum_EstadoUsuario
	}

	type Usuario {
		_id: ID!
		cedula: String!
		nombres: String!
		apellidos: String!
		correo: String!
		tusuario: Enum_Rol!
		estado: Enum_EstadoUsuario
		inscripciones: [Inscripcion]
		avancesCreados: [Avance]
		proyectosLiderados: [Proyecto]
	}

	type Query {
		Usuarios: [Usuario]
		Usuario(_id: String!): Usuario
	}

	type Mutation {
		crearUsuario( campos: camposUsuario! ): Usuario

		editarUsuario( _id: String!, campos: camposUsuario! ): Usuario

		eliminarUsuario(_id: String, correo: String): Usuario
	}
`;

export { tiposUsuario };
