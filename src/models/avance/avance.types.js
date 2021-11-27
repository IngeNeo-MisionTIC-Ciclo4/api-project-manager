import { gql } from 'apollo-server-express';

const tiposAvance = gql`
	type Avance {
		_id: ID!
		proyecto: Proyecto!
		descripcion: String!
		fechaAvance: Date!
		observaciones: String
		estudiante: Usuario!
	}

	type Query {
		Avances: [Avance]
		filtrarAvance(_id: String!): [Avance]
	}
	type Mutation {
		crearAvance(
			proyecto: String!,
			descripcion: String!,
			fechaAvance: Date!,
			observaciones: String,
			estudiante: String!
		): Avance

		editarAvance(
			_id: String!
			proyecto: String!,
			descripcion: String!,
			fechaAvance: Date!,
			observaciones: String,
			estudiante: String!
		): Avance

		eliminarAvance(_id: String): Avance
	}
`;

export { tiposAvance };