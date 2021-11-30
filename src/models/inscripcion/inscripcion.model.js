import Mongoose from 'mongoose';
import { ModeloProyecto } from '../proyecto/proyecto.model.js';
import { ModeloUsuario } from '../usuario/usuario.model.js'

const { Schema, model } = Mongoose;

const InscripcionSchema = new Schema
(
	{
		estado: {
			type: String,
			enum: ['Aceptado', 'Rechazado', 'Pendiente'],
			default: 'Pendiente',
			required: true,
		},
		fechaIngreso: {
			type: Date,
			required: false,
		},
		fechaEgreso: {
			type: Date,
			required: false,
		},
		proyecto: {
			type: Schema.Types.ObjectId,
			ref: ModeloProyecto,
			required: true,
		},
		estudiante: {
			type: Schema.Types.ObjectId,
			ref: ModeloUsuario,
			required: true,
		},
	},
	{ versionKey: false }
);

const ModeloInscripcion = model('Inscripcion', InscripcionSchema, 'inscripciones');

export { ModeloInscripcion };