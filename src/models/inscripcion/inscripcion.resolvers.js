import { ModeloProyecto } from '../proyecto/proyecto.model.js';
import { ModeloInscripcion } from '../inscripcion/inscripcion.model.js';
import { ModeloUsuario } from '../usuario/usuario.model.js';

const resolverInscripcion = {

	Inscripcion: {
		proyecto: async (parent, args, context) => await ModeloProyecto.findOne({ _id: parent.proyecto }),
		estudiante: async (parent, args, context) => await ModeloUsuario.findOne({ _id: parent.estudiante }),
	},

	Query: {

		InscripcionesAll: async (parent, args) => {
			console.log("Esta entrando a consultar todas las inscripciones");
			console.log("data", args);
			//Consulta una sola inscripcion por ID
			const inscripcion = await ModeloInscripcion.find().populate('proyecto').populate('estudiante');
			return inscripcion;
		},

		Inscripciones: async (parent, args, context) => {
			console.log("Esta entrando a consultar todas las inscripciones");
			console.log("data", args);
			//const inscripciones = await ModeloInscripcion.find().populate('proyecto').populate('estudiante');
			let filtro = {};
			if (context.userData) {
				if (context.userData.rol === 'Lider') {
					const projects = await ModeloProyecto.find({ lider: context.userData._id });
					const projectList = projects.map((p) => p._id.toString());
					filtro = {
						proyecto: {
							$in: projectList,
						},
					};
				}
			}

			const inscripciones = await ModeloInscripcion.find({ ...filtro });
			return inscripciones;
		},

		Inscripcion: async (parent, args) => {
			console.log("Esta entrando a consultar una inscripción");
			console.log("data", args);
			//Consulta una sola inscripcion por ID
			const inscripcion = await ModeloInscripcion.findOne({ _id: args._id }).populate('proyecto').populate('estudiante');
			return inscripcion;
		},

		MisInscripciones: async (parent, args) => {
			console.log("Esta entrando a consultar las inscripciones de un estudiante");
			console.log("data", args);
			//Consulta un solo proyecto por ID
			const MisInscripciones = await ModeloInscripcion.find({ estudiante: args.estudiante }).populate('proyecto').populate('estudiante');
			return MisInscripciones;
		},
	},

	Mutation: {

		crearInscripcion: async (parent, args, context) => {
			console.log("Esta entrando a crear una inscripción");
			console.log("data", args);
			const inscripcionCreada = await ModeloInscripcion.create({ ...args.campos });
			return inscripcionCreada;
		},

		editarInscripcion: async (parent, args, context) => {
			console.log("Esta entrando a editar una inscripción");
			console.log("data", args);
			const inscripcionEditada = await ModeloInscripcion.findByIdAndUpdate(
				args._id,
				{ ...args.campos },
				{ new: true }
			);
			return inscripcionEditada;
		},

		aprobarInscripcion: async (parent, args, context) => {
			const inscripcionAprobada = await ModeloInscripcion.findByIdAndUpdate(
				args.id,
				{
					estado: 'Aceptado',
					fechaIngreso: Date.now(),
				},
				{ new: true }
			);
			return inscripcionAprobada;
		},

		eliminarInscripcion: async (parent, args, context) => {
			console.log("Esta entrando a eliminar una inscripción");
			console.log("data", args);
			//Eliminación por ID
			const inscripcionEliminada = await ModeloInscripcion.findOneAndDelete({ _id: args._id });
			return inscripcionEliminada;
		},
	},
};

export { resolverInscripcion };