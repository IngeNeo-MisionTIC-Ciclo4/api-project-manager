import { ModeloUsuario } from '../usuario/usuario.model.js';
import { generarToken } from '../../utils/token.js';
import bcrypt from 'bcrypt';

const resolversAutenticacion = {

	Mutation: {

		registro: async (parent, args) => {
			const salt = await bcrypt.genSalt(15);
			const hashedPassword = await bcrypt.hash(args.password, salt);
			const usuarioCreado = await ModeloUsuario.create({
				cedula: args.cedula,
				nombres: args.nombres,
				apellidos: args.apellidos,
				correo: args.correo,
				tusuario: args.tusuario,
				estado: args.estado,
				password: hashedPassword,
			});
			console.log('usuario creado con exito', usuarioCreado);
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
			const usuarioEnBD = await ModeloUsuario.findOne({ correo: args.correo });
			if (await bcrypt.compare(args.password, usuarioEnBD.password)) {
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
			if (!context.userData) {
				return {
					error: 'El token no es valido',
				};
			} else {
				return {
					token: generarToken({
						_id: context.userData._id,
						cedula: context.userData.cedula,
						nombres: context.userData.nombres,
						apellidos: context.userData.apellidos,
						correo: context.userData.correo,
						tusuario: context.userData.rol,
						estado: context.userData.estado,
					}),
				};
			}
		},
	},
};

export { resolversAutenticacion };