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
    tipoinvitado: {
        type: String,
        required: [true, 'El tipo de invitado es obligatorio']
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
    dni: {
        type: String,
        required: [true, 'El DNI es obligatorio']
    },
    celular: {
        type: String,
        required: [true, 'El celular es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    comentarios: {
        type: String
    },
    post: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'Debe existir una referencia a un post']
    }
});
//Esto es como un trigger que se dispara antes de guardarlo en la BD
asistenteSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Asistente = mongoose_1.model('Asistente', asistenteSchema);
