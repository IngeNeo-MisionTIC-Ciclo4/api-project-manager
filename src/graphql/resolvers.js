import { resolversAvance } from '../models/avance/avance.resolvers.js';
import { resolverInscripcion } from '../models/inscripcion/inscripcion.resolvers.js';
import { resolversProyecto } from '../models/proyecto/proyecto.resolvers.js';
import { resolversUsuario } from '../models/usuario/usuario.resolvers.js';

//Exportamos todos los solucionadores para manejar un solo resolver en el Servidor
export const resolvers = [
	resolversAvance,
	resolverInscripcion,
	resolversProyecto,
	resolversUsuario,
];