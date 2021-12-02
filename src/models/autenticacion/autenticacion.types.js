import { gql } from 'apollo-server-express';

const tiposAutenticacion = gql`

	type Token {
		token: String
		error: String
	}

	type Mutation {
		registro(
			cedula: String
			nombres: String
			apellidos: String
			correo: String!
			password: String!
			tusuario: Enum_Tusuario
			estado: Enum_EstadoUsuario
		): Token!

		login(correo: String!, password: String!): Token

		renovarToken: Token
	}
`;

export { tiposAutenticacion };