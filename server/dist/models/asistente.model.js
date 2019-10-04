"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const asistenteSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    codigo: {
        type: String,
        unique: true,
        required: [true, 'El código es obligatorio']
    },
    fuente: {
        type: String,
        required: [true, 'La fuente es obligatoria']
    },
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    appaterno: {
        type: String,
        required: [true, 'El apellido paterno es obligatorio']
    },
    apmaterno: {
        type: String,
        required: [true, 'El apellido materno es obligatorio']
    },
    empresa: {
        type: String,
        required: [true, 'La empresa es obligatorio']
    },
    cargo: {
        type: String,
        required: [true, 'El cargo es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    telefono: {
        type: String,
        required: [true, 'El télefono es obligatorio']
    },
    ciudad: {
        type: String,
        required: [true, 'La ciudad es obligatorio']
    },
    pais: {
        type: String,
        required: [true, 'El país es obligatorio']
    },
    leadsource: {
        type: String,
        required: [true, 'El lead source es obligatorio']
    },
    leadsourced: {
        type: String,
        required: [true, 'El lead source details es obligatorio']
    },
    productinterest: {
        type: String,
        required: [true, 'El product interest es obligatorio']
    },
    leadowner: {
        type: String,
        required: [true, 'El lead owner es obligatorio']
    },
    post: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'Debe existir una referencia a un post']
    },
    asistio: {
        type: Boolean,
        default: false
    },
    fasistencia: {
        type: Date
    }
});
//Esto es como un trigger que se dispara antes de guardarlo en la BD
asistenteSchema.pre('save', function (next) {
    this.created = new Date();
    this.fasistencia = new Date();
    next();
});
exports.Asistente = mongoose_1.model('Asistente', asistenteSchema);
