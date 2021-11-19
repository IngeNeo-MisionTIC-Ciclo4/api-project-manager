import mongoose from 'mongoose';
import { ModeloUsuario } from '../usuario/usuario.js'

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
				type: Double,
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
		});

const ModeloProyecto = model('Proyecto', ProyectoSchema);

export { ModeloProyecto };