import mongoose from 'mongoose';
import { ModeloProyecto } from '../proyecto/proyecto.model.js';
import { ModeloUsuario } from '../usuario/usuario.model.js'

const { Schema, model } = mongoose;

const AvanceSchema = new Schema ({
	proyecto: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: ModeloProyecto,
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
		required: false,
	},
	estudiante: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: ModeloUsuario,
	},
});

const ModeloAvance = model('Avance', AvanceSchema);

export { ModeloAvance };