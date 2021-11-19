
import Mongoose from 'mongoose';

const {Schema, model} = Mongoose;

const UsuarioSchema = new Schema  ({
    cedula: {
        type: String,
        required: true,
        unique: true,
    },
    nombres: {
        type: String,
        required: true,
    },
    apellidos: {
        type: String,
        required: true,
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (email) => {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            },
            message: 'El formato del Email es incorrecto.',
        },
    },
    tusuario: {
        type: String,
        enum: ['Estudiante', 'Lider', 'Administrador'],
        },
    estado: {
        type: String,
        enum: ['Pendiente', 'Autorizado', 'No_Autorizado'],
        default: 'Pendiente',
        },
});

const ModeloUsuario = model('Usuario', UsuarioSchema);

export {ModeloUsuario};