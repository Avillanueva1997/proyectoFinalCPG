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
        type: String
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
        type: String
    },
    empresa: {
        type: String
    },
    cargo: {
        type: String
    },
    tipoinvitado: {
        type: String,
        required: [true, 'El tipo de invitado es obligatorio']
    },
    email: {
        type: String
    },
    telefono: {
        type: String
    },
    ciudad: {
        type: String
    },
    pais: {
        type: String
    },
    leadsource: {
        type: String
    },
    leadsourced: {
        type: String
    },
    productinterest: {
        type: String
    },
    leadowner: {
        type: String
    },
    post: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, 'Debe existir una referencia a un post']
    },
    asistio: {
        type: Boolean,
        default: false
    },
    fasistencia: {
        type: Date
    },
    tipocarga: {
        type: String,
        default: '01'
    }
});
//Esto es como un trigger que se dispara antes de guardarlo en la BD
asistenteSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Asistente = mongoose_1.model('Asistente', asistenteSchema);
