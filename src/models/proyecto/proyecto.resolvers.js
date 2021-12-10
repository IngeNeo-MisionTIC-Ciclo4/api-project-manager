import { ModeloProyecto } from '../proyecto/proyecto.model.js';
import { ModeloInscripcion } from '../inscripcion/inscripcion.model.js';
import { ModeloUsuario } from '../usuario/usuario.model.js';



const resolversProyecto = {

	Proyecto: {
		lider: async (parent, args, context) => {
			const usr = await ModeloUsuario.findOne({
				_id: parent.lider.toString(),
			});
			return usr;
		},

		inscripciones: async (parent, args, context) => {
			const inscripciones = await ModeloInscripcion.find({
				proyecto: parent._id,
			});
			return inscripciones;
		},
	},

	Query: {
		Proyectos: async (parent, args, context) => {
			console.log("Esta entrando a consultar todos los proyectos");
			console.log("data", args);
			const proyectos = await ModeloProyecto.find();
			return proyectos;
		},

		Proyecto: async (parent, args, context) => {
			console.log("Esta entrando a consultar un proyecto");
			console.log("data", args);
			//Consulta un solo proyecto por ID
			const proyecto = await ModeloProyecto.findOne({ _id: args._id });
			return proyecto;
		},
		ProyectosLiderados: async (parent, args, context) => {
			console.log("Esta entrando a consultar los proyectos liderados");
			console.log("data", args);
			//Consulta los proyectos por lider
			const ProyectosLiderados = await ModeloProyecto.find({ lider: args.lider }).populate('avances');
			return ProyectosLiderados;
		},
	},

	Mutation: {

		crearProyecto: async (parent, args, context) => {
			console.log("Esta entrando a crear un proyecto");
			console.log("data", args);
			const proyectoCreado = await ModeloProyecto.create({...args.campos });
			return proyectoCreado;
		},

		editarProyecto: async (parent, args, context) => {
			console.log("Esta entrando a editar un proyecto");
			console.log("data", args);
			const proyectoEditado = await ModeloProyecto.findByIdAndUpdate(
				args._id,
				{ ...args.campos },
				{ new: true }
			);
			return proyectoEditado;
		},

		crearObjetivo: async (parent, args, context) => {
			console.log("Esta entrando a crear un objetivo");
			console.log("data", args);
			const proyectoConObjetivo = await ModeloProyecto.findByIdAndUpdate(
				args.idProyecto,
				{
					$addToSet: {
						objetivos: { ...args.campos },
					},
				},
				{ new: true }
			);

			return proyectoConObjetivo;
		},

		editarObjetivo: async (parent, args, context) => {
			console.log("Esta entrando a editar un objetivo");
			console.log("data", args);
			const proyectoEditado = await ModeloProyecto.findByIdAndUpdate(
				args.idProyecto,
				{
					$set: {
						[`objetivos.${args.indexObjetivo}.descripcion`]: args.campos.descripcion,
						[`objetivos.${args.indexObjetivo}.tipo`]: args.campos.tipo,
					},
				},
				{ new: true }
			);
			return proyectoEditado;
		},

		eliminarObjetivo: async (parent, args, context) => {
			console.log("Esta entrando a eliminar un objetivo");
			console.log("data", args);
			const proyectoObjetivo = await ModeloProyecto.findByIdAndUpdate(
				{ _id: args.idProyecto },
				{
					$pull: {
						objetivos: {
							_id: args.idObjetivo,
						},
					},
				},
				{ new: true }
			);
			return proyectoObjetivo;
		},

		eliminarProyecto: async (parent, args, context) => {
			console.log("Esta entrando a eliminar un proyecto");
			console.log("data", args);
			//Eliminación por ID
			const proyectoEliminado = await ModeloProyecto.findOneAndDelete({ _id: args._id });
			return proyectoEliminado;
		},
	},
};

export { resolversProyecto };