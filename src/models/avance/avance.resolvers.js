import { ModeloAvance } from './avance.model.js';

const resolversAvance = {
	Query: {
		Avances: async (parent, args) => {
			console.log("Esta entrando a consultar todos los avances");
			console.log("data", args);
			const avances = await ModeloAvance.find().populate('proyecto').populate('estudiante');
			return avances;
		},
		filtrarAvance: async (parents, args) => {
			console.log("Esta entrando a consultar un avance");
			console.log("data", args);
			const avanceFiltrado = await ModeloAvance.find({ _id: args._id }).populate('proyecto').populate('estudiante');
			return avanceFiltrado;
		},
	},
	Mutation: {
		crearAvance: async (parents, args) => {
			console.log("Esta entrando a crear un avance");
			console.log("data", args);
			const avanceCreado = ModeloAvance.create({
				fechaAvance: args.fechaAvance,
				descripcion: args.descripcion,
				proyecto: args.proyecto,
				observaciones: args.observaciones,
				estudiante: args.estudiante,
			});
			return avanceCreado;
		},
		editarAvance: async (parent, args) => {
			console.log("Esta entrando a editar un avance");
			console.log("data", args);
			const AvanceEditado = await ModeloAvance.findByIdAndUpdate(
				args._id,
				{
					fechaAvance: args.fechaAvance,
					descripcion: args.descripcion,
					proyecto: args.proyecto,
					observaciones:args.observaciones,
					estudiante: args.estudiante,
				},
				{ new: true }
			);
			return AvanceEditado;
		},
		eliminarAvance: async (parent, args) => {
			console.log("Esta entrando a eliminar un avance");
			console.log("data", args);
			//Eliminación por ID
			const AvanceEliminado = await ModeloAvance.findOneAndDelete({ _id: args._id });
			return AvanceEliminado;
		},
	},
};

export { resolversAvance };