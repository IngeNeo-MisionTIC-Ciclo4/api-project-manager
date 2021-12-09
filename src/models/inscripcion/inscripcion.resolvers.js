import { ModeloInscripcion } from './inscripcion.model.js';

const resolverInscripcion = {
	Query: {

		Inscripciones: async (parent, args) => {
			console.log("Esta entrando a consultar todas las inscripciones");
			console.log("data", args);
			//const inscripciones = await ModeloInscripcion.find().populate('proyecto').populate('estudiante');
			const inscripciones = await ModeloInscripcion.find().populate([
				{
						path: 'proyecto',
						populate: [{ path: 'lider' }, { path: 'avances' }],
				},
				{
					path: 'estudiante',
				},
			]);
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

		crearInscripcion: async (parent, args) => {
			console.log("Esta entrando a crear una inscripción");
			console.log("data", args);
			const inscripcionCreada = await ModeloInscripcion.create({ ...args.campos });
			return inscripcionCreada;
		},

		editarInscripcion: async (parent, args) => {
			console.log("Esta entrando a editar una inscripción");
			console.log("data", args);
			const inscripcionEditada = await ModeloInscripcion.findByIdAndUpdate(
				args._id,
				{ ...args.campos },
				{ new: true }
			);
			return inscripcionEditada;
		},

		aprobarInscripcion: async (parent, args) => {
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