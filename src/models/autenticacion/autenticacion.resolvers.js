import { ModeloUsuario } from '../usuario/usuario.model.js';
import { generarToken } from '../../utils/token.js';
import bcrypt from 'bcrypt';

const resolversAutenticacion = {

	Mutation: {

		registro: async (parent, args) => {
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
			console.log('usuario creado con exito', usuarioCreado);
			//Se hace el llamdo la función de generar el token para retornarlo
			return {
				token: generarToken({
					_id: usuarioCreado._id,
					cedula: usuarioCreado.cedula,
					nombres: usuarioCreado.nombres,
					apellidos: usuarioCreado.apellidos,
					correo: usuarioCreado.correo,
					tusuario: usuarioCreado.tusuario,
					estado: usuarioCreado.estado,
				}),
			};
		},

		login: async (parent, args) => {
			//Se realiza la consulta a la base de datos para determinar si el usuario existe
			const usuarioEnBD = await ModeloUsuario.findOne({ correo: args.correo });
			//Se realiza la comparación de la contraseña almacenada en la BD y la ingresada en el formulario
			if (await bcrypt.compare(args.password, usuarioEnBD.password)) {
				//Si son correctas se llama la función de generar token y de regresa con los datos del usuario
				return {
					token: generarToken({
						_id: usuarioEnBD._id,
						cedula: usuarioEnBD.cedula,
						nombres: usuarioEnBD.nombres,
						apellidos: usuarioEnBD.apellidos,
						correo: usuarioEnBD.correo,
						tusuario: usuarioEnBD.tusuario,
						estado: usuarioEnBD.estado,
					}),
				};
			}
		},

		renovarToken: async (parent, args, context) => {
			console.log('contexto', context);
			//Se revisa si existe el token y si no existe o es invalido retorna mensaje
			if (!context.userData) {
				return {
					error: 'El token no es valido',
				};
			} else {
			//En caso que el token sea valido se renueva el toke y se envia nuevamente
				return {
					token: generarToken({
						_id: context.userData._id,
						cedula: context.userData.cedula,
						nombres: context.userData.nombres,
						apellidos: context.userData.apellidos,
						correo: context.userData.correo,
						tusuario: context.userData.tusuario,
						estado: context.userData.estado,
					}),
				};
			}
		},
	},
};

export { resolversAutenticacion };