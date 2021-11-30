import { gql } from 'apollo-server-express';

const tiposInscripcion = gql`

	input camposInscripcion {
		estado: Enum_EstadoInscripcion
		fechaIngreso: Date
		fechaEgreso: Date
		proyecto: String
		estudiante: String
	}

	type Inscripcion {
		_id: ID!
		estado: Enum_EstadoInscripcion!
		fechaIngreso: Date
		fechaEgreso: Date
		proyecto: Proyecto!
		estudiante: Usuario!
	}

	type Query {
		Inscripciones: [Inscripcion]
		Inscripcion(_id: String!): Inscripcion
		MisInscripciones(estudiante: String!): [Inscripcion]
	}

	type Mutation {
		crearInscripcion( campos: camposInscripcion! ): Inscripcion

		editarInscripcion( _id: String!, campos: camposInscripcion! ): Inscripcion

		eliminarInscripcion(_id: String): Inscripcion
	}
`;

export { tiposInscripcion };
