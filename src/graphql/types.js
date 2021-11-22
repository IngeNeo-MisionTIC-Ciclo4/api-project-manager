import { gql } from 'apollo-server-express';
import { tiposEnums } from '../models/enums/enum.types.js';
import { tiposUsuario } from '../models/usuario/usuario.types.js';
import { tiposProyecto } from '../models/proyecto/proyecto.types.js';
import { tiposAvance } from '../models/avance/avance.types.js';
import { tiposInscripcion } from '../models/inscripcion/inscripcion.types.js';

const tiposGlobales = gql`
  scalar Date
`;

export const types = [
	tiposGlobales,
	tiposEnums,
	tiposUsuario,
	tiposProyecto,
	tiposAvance,
	tiposInscripcion,
];
