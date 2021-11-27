import mongoose from 'mongoose';
import { ModeloProyecto } from '../proyecto/proyecto.model.js';
import { ModeloUsuario } from '../usuario/usuario.model.js'

const { Schema, model } = mongoose;

const AvanceSchema = new Schema ({
	proyecto: {
		type: Schema.Types.ObjectId,
		ref: ModeloProyecto,
		required: true,
	},
	descripcion: {
		type: String,
		required: true,
	},
	fechaAvance: {
		type: Date,
		required: true,
	},
	observaciones: {
		type: String,
	},
	estudiante: {
		type: Schema.Types.ObjectId,
		ref: ModeloUsuario,
		required: true,
	},
});

const ModeloAvance = model('Avance', AvanceSchema);

export { ModeloAvance };