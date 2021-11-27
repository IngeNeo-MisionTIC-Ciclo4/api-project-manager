import { ModeloUsuario } from './usuario.model.js';

const resolversUsuario = {
	Query: {
		Usuarios: async (parent, args) => {
			console.log("Esta entrando a consultar todos los usuarios");
			console.log("data", args);
			//Consulta todos los usuarios
			const usuarios = await ModeloUsuario.find();
			return usuarios;
		},
		Usuario: async (parent, args) => {
			console.log("Esta entrando a consultar un usuario");
			console.log("data", args);
			//Consulta un solo usuario por ID
			const usuario = await ModeloUsuario.findOne({ _id: args._id });
			return usuario;
		},
	},
	Mutation: {
		crearUsuario: async (parent, args) => {
			console.log("Esta entrando a crear un usuario");
			console.log("data", args);
			const usuarioCreado = await ModeloUsuario.create({
				cedula: args.cedula,
				nombres: args.nombres,
				apellidos: args.apellidos,
				correo: args.correo,
				tusuario: args.tusuario,
			});

			if (Object.keys(args).includes('estado')) {
				usuarioCreado.estado = args.estado;
			}

			return usuarioCreado;
		},
		editarUsuario: async (parent, args) => {
			//El tipo de usuario no se puede modificar
			console.log("Esta entrando a editar un usuario");
			console.log("data", args);
			const usuarioEditado = await ModeloUsuario.findByIdAndUpdate(
				args._id,
				{
					cedula: args.cedula,
					nombres: args.nombres,
					apellidos: args.apellidos,
					correo: args.correo,
					estado: args.estado,
				},
				{ new: true }
			);

			return usuarioEditado;
		},
		eliminarUsuario: async (parent, args) => {
			console.log("Esta entrando a eliminar un usuario");
			console.log("data", args);
			//Eliminación por ID o por correo
			//Validamos si en los parementro se envio el ID, si es asi se eliminará por ID
			if (Object.keys(args).includes('_id')) {
				const usuarioEliminado = await ModeloUsuario.findOneAndDelete({ _id: args._id });
				return usuarioEliminado;
			} else if (Object.keys(args).includes('correo')) {
				//En caso contrario si no tiene el ID y si contiene el correo se elimina por este campo, pues el correo es Unique
				const usuarioEliminado = await ModeloUsuario.findOneAndDelete({ correo: args.correo });
				return usuarioEliminado;
			}
		},
	},
};

export { resolversUsuario };
