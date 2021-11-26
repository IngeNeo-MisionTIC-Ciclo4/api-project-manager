import mongoose from 'mongoose';
import { ModeloProyecto } from '../proyecto/proyecto.model.js';
import { ModeloUsuario } from '../usuario/usuario.model.js'

const { Schema, model } = mongoose;

const InscripcionSchema = new Schema ({
	estado: {
		type: String,
		enum: ['Aceptado', 'Rechazado', 'Pendiente'],
		default: 'Pendiente',
		required: true,
	},
	FechaIngreso: {
		type: Date,
	},
	FechaEgreso: {
		type: Date,
	},
	proyecto: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: ModeloProyecto,
	},
	estudiante: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: ModeloUsuario,
	},
});

const ModeloInscripcion = model('Inscripcion', InscripcionSchema, 'inscripciones');

export { ModeloInscripcion };