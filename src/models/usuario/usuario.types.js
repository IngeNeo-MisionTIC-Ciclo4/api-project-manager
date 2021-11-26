import { gql } from 'apollo-server-express';

const tiposUsuario = gql`
	type Usuario {
		_id: ID!
		cedula: String!
		nombres: String!
		apellidos: String!
		correo: String!
		tusuario: Enum_Rol!
		estado: Enum_EstadoUsuario
	}

	type Query {
		Usuarios: [Usuario]
		Usuario(_id: String!): Usuario
	}

	type Mutation {
		crearUsuario(
			cedula: String!
			nombres: String!
			apellidos: String!
			correo: String!
			tusuario: Enum_Rol!
			estado: Enum_EstadoUsuario
		): Usuario

		editarUsuario(
			_id: String!
			cedula: String!
			nombres: String!
			apellidos: String!
			correo: String!
			estado: Enum_EstadoUsuario
		): Usuario

		eliminarUsuario(_id: String, correo: String): Usuario
	}
`;

export { tiposUsuario };
