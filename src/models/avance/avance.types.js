import { gql } from 'apollo-server-express';

const tiposAvance = gql`

	input camposAvance {
		proyecto: String
		descripcion: String
		fechaAvance: Date
		observaciones: String
		creadoPorEstudiante:String
	}

	type Avance {
		_id: ID!
		proyecto: Proyecto!
		descripcion: String!
		fechaAvance: Date!
		observaciones: String
		creadoPorEstudiante: Usuario!
	}

	type Query {
		Avances: [Avance]
		filtrarAvance(_id: String!): [Avance]
	}

	type Mutation {
		crearAvance( campos: camposAvance! ): Avance

		editarAvance( _id: String!, campos: camposAvance! ): Avance

		eliminarAvance(_id: String): Avance
	}
`;

export { tiposAvance };