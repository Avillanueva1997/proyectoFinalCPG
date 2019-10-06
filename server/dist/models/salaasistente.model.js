"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const salaasistenteSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    sala: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Sala',
        required: [true, 'Debe existir una referencia a un sala']
    },
    asistente: {
        type: mongoose_1.Schema.Types.ObjectId,
        unique: true,
        ref: 'Asistente',
        required: [true, 'Debe existir una referencia a un asistente']
    },
    post: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, 'Debe existir una referencia a un post']
    }
});
//Esto es como un trigger que se dispara antes de guardarlo en la BD
salaasistenteSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.SalaAsistente = mongoose_1.model('Salaasistente', salaasistenteSchema);
