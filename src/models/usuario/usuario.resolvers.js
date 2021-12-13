import { ModeloUsuario } from '../usuario/usuario.model.js';
import { ModeloInscripcion } from '../inscripcion/inscripcion.model.js';
import bcrypt from 'bcrypt';


const resolversUsuario = {
	Usuario: {

		inscripciones: async (parent, args, context) => {
			return ModeloInscripcion.find({ estudiante: parent._id });
		},
	},

	Query: {

		UsuariosAll: async (parent, args, context) => {
			console.log("Esta entrando a consultar todos los usuarios");
			console.log("data", args);
			//Consulta todos los usuarios
			const usuariosAll = await ModeloUsuario.find();
			return usuariosAll;
		},

		Usuarios: async (parent, args, context) => {
			console.log("Esta entrando a consultar todos los usuarios con filtro");
			console.log("data", args);
			//Consulta todos los usuarios por filtro
			const usuarios = await ModeloUsuario.find({ ...args.filtro });
			return usuarios;
		},

		Usuario: async (parent, args, context) => {
			console.log("Esta entrando a consultar un usuario");
			console.log("data", args);
			//Consulta un solo usuario por ID
			const usuario = await ModeloUsuario.findOne({ _id: args._id });
			return usuario;
		},
	},

	Mutation: {

		crearUsuario: async (parent, args, context) => {
			console.log("Esta entrando a crear un usuario");
			console.log("data", args);
			//Se define el número de veces que se encriptara la contraseña
			const salt = await bcrypt.genSalt(15);
			//Se usa la función de bcrypt Salt para encriptar la contraseña varias veces
			const hashedPassword = await bcrypt.hash(args.password, salt);
			//Se procede a crear el usuario en la base de datos
			const usuarioCreado = await ModeloUsuario.create({
				cedula: args.cedula,
				nombres: args.nombres,
				apellidos: args.apellidos,
				correo: args.correo,
				tusuario: args.tusuario,
				password: hashedPassword,
			});

			if (Object.keys(args).includes('estado')) {
				usuarioCreado.estado = args.estado;
			}

			return usuarioCreado;
		},

		editarUsuario: async (parent, args, context) => {
			//El tipo de usuario no se puede modificar tenerlo en cuenta
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

		eliminarUsuario: async (parent, args, context) => {
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