import { ModeloInscripcion } from './inscripcion.model.js';

const resolverInscripcion = {
	Query: {
		Inscripciones: async (parent, args) => {
			console.log("Esta entrando a consultar todas las inscripciones");
			console.log("data", args);
			const inscripciones = await ModeloInscripcion.find().populate('proyecto').populate('estudiante');
			return inscripciones;
		},
		Inscripcion: async (parent, args) => {
			console.log("Esta entrando a consultar una inscripción");
			console.log("data", args);
			//Consulta un solo proyecto por ID
			const proyecto = await ModeloInscripcion.findOne({ _id: args._id }).populate('proyecto').populate('estudiante');
			return proyecto;
		},
	},
	Mutation: {
		crearInscripcion: async (parent, args) => {
			console.log("Esta entrando a crear una inscripción");
			console.log("data", args);
			const inscripcionCreada = await ModeloInscripcion.create({
				estado: args.estado,
				proyecto: args.proyecto,
				estudiante: args.estudiante,
			});
			return inscripcionCreada;
		},
		editarInscripcion: async (parent, args) => {
			console.log("Esta entrando a editar una inscripción");
			console.log("data", args);
			const inscripcionEditada = await ModeloInscripcion.findByIdAndUpdate(
				args._id,
				{
					estado: args.estado,
					fechaIngreso: Date.now(),
				},
				{ new: true }
			);
			return inscripcionEditada;
		},
		eliminarInscripcion: async (parent, args) => {
			console.log("Esta entrando a eliminar una inscripción");
			console.log("data", args);
			//Eliminación por ID
			const inscripcionEliminada = await ModeloInscripcion.findOneAndDelete({ _id: args._id });
			return inscripcionEliminada;
		},
	},
};

export { resolverInscripcion };
