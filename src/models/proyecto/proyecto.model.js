import mongoose from 'mongoose';
import { ModeloUsuario } from '../usuario/usuario.model.js'

const { Schema, model } = mongoose;

const ProyectoSchema = new Schema
	(
		{
			nombreproyecto: {
				type: String,
				require: true,
			},
			objetivogeneral: {
				type: String,
				require: true,
			},
			objetivoespecifico: {
				type: String,
				require: true,
			},
			presupuesto: {
				type: Number,
				require: true,
			},
			fechaInicio: {
				type: Date,
				require: true,
			},
			fechaFin: {
				type: Date,
				require: true,
			},
			lider: {
				type: Schema.Types.ObjectId,
				require: true,
				ref: ModeloUsuario,
			},
			estado: {
				type: String,
				enum: ['Activo', 'Inactivo'],
				default: 'Inactivo',
			},
			fase: {
				type: String,
				enum: ['Iniciado', 'En_desarrollo', 'Terminado', 'Nulo'],
				default: 'Nulo',
			}
		},
		{
			toJSON: { virtuals: true },
			toObject: { virtuals: true },
		}
		);

ProyectoSchema.virtual('avances', {
	ref: 'Avance',
	localField: '_id',
	foreignField: 'proyecto',
});

ProyectoSchema.virtual('inscripciones', {
	ref: 'Inscripcion',
	localField: '_id',
	foreignField: 'proyecto',
});

const ModeloProyecto = model('Proyecto', ProyectoSchema);

export { ModeloProyecto };