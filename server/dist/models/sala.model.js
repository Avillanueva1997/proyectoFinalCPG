"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const salaSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    codigo: {
        type: String,
        unique: true,
        required: [true, 'El código es obligatorio']
    },
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    tipo: {
        type: String,
        required: [true, 'El tipo es obligatorio']
    },
    aforo: {
        type: Number
    },
    aforosuperado: {
        type: Number
    },
    post: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, 'Debe existir una referencia a un post']
    }
});
//Esto es como un trigger que se dispara antes de guardarlo en la BD
salaSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Sala = mongoose_1.model('Sala', salaSchema);
