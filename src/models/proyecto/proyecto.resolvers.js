import { ModeloProyecto } from './proyecto.model.js';

const resolversProyecto = {
	Query: {
		Proyectos: async (parent, args) => {
			console.log("Esta entrando a consultar todos los proyectos");
			console.log("data", args);
			const proyectos = await ModeloProyecto.find().populate('lider').populate('avances').populate('inscripciones');
			return proyectos;
		},
		Proyecto: async (parent, args) => {
			console.log("Esta entrando a consultar un proyecto");
			console.log("data", args);
			//Consulta un solo proyecto por ID
			const proyecto = await ModeloProyecto.findOne({ _id: args._id }).populate('lider').populate('avances').populate('inscripciones');;
			return proyecto;
		},
	},
	Mutation: {
		crearProyecto: async (parent, args) => {
			console.log("Esta entrando a crear un proyecto");
			console.log("data", args);
			const proyectoCreado = await ModeloProyecto.create({
				nombreproyecto: args.nombreproyecto,
				objetivogeneral: args.objetivogeneral,
				objetivoespecifico: args.objetivoespecifico,
				presupuesto: args.presupuesto,
				fechaInicio: args.fechaInicio,
				fechaFin: args.fechaFin,
				lider: args.lider,
				estado: args.estado,
				fase: args.fase,
			});
			return proyectoCreado;
		},
		editarProyecto: async (parent, args) => {
			console.log("Esta entrando a editar un proyecto");
			console.log("data", args);
			const proyectoEditado = await ModeloProyecto.findByIdAndUpdate(
				args._id,
				{
					nombreproyecto: args.nombreproyecto,
					objetivogeneral: args.objetivogeneral,
					objetivoespecifico: args.objetivoespecifico,
					presupuesto: args.presupuesto,
					fechaInicio: args.fechaInicio,
					fechaFin: args.fechaFin,
					lider: args.lider,
					estado: args.estado,
					fase: args.fase,
				},
				{ new: true }
			);
			return proyectoEditado;
		},
		eliminarProyecto: async (parent, args) => {
			console.log("Esta entrando a eliminar un proyecto");
			console.log("data", args);
			//Eliminación por ID
			const proyectoEliminado = await ModeloProyecto.findOneAndDelete({ _id: args._id });
			return proyectoEliminado;
		},
	},
};

export { resolversProyecto };