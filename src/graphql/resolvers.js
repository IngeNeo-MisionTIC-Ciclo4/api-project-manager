import { resolversAvance } from '../models/avance/avance.resolvers.js';
import { resolverInscripcion } from '../models/inscripcion/inscripcion.resolvers.js';
import { resolversProyecto } from '../models/proyecto/proyecto.resolvers.js';
import { resolversUsuario } from '../models/usuario/usuario.resolvers.js';

export const resolvers = [
	resolversAvance,
	resolverInscripcion,
	resolversProyecto,
	resolversUsuario,
];
