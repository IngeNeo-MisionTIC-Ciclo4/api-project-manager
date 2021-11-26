import { gql } from 'apollo-server-express';

const tiposProyecto = gql`

	type Proyecto {
		_id: ID!
		nombreproyecto: String!
		objetivogeneral: String!
		objetivoespecifico: String!
		presupuesto: Float!
		fechaInicio: Date!
		fechaFin: Date!
		lider: Usuario!
		estado: Enum_EstadoProyecto!
		fase: Enum_FaseProyecto!
		avances: [Avance]
		inscripciones: [Inscripcion]
	}

	type Query {
		Proyectos: [Proyecto]
		Proyecto(_id: String!): Proyecto
	}

	type Mutation {
		crearProyecto(
			nombreproyecto: String!
			objetivogeneral: String!
			objetivoespecifico: String!
			presupuesto: Float!
			fechaInicio: Date!
			fechaFin: Date!
			lider: String!
			estado: Enum_EstadoProyecto!
			fase: Enum_FaseProyecto!
		): Proyecto

		editarProyecto(
			_id: String!
			nombreproyecto: String!
			objetivogeneral: String!
			objetivoespecifico: String!
			presupuesto: Float!
			fechaInicio: Date!
			fechaFin: Date!
			lider: String!
			estado: Enum_EstadoProyecto!
			fase: Enum_FaseProyecto!
		): Proyecto

		eliminarProyecto(_id: String): Proyecto
	}
`;

export { tiposProyecto };