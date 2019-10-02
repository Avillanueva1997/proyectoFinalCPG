"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    description: {
        type: String
    },
    place: {
        type: String
    },
    organizador: {
        type: String
    },
    cargo: {
        type: String
    },
    email: {
        type: String
    },
    telf: {
        type: String
    },
    fein: {
        type: Date
    },
    fefn: {
        type: Date
    },
    hrin: {
        type: Date
    },
    hrfn: {
        type: Date
    },
    lios: {
        type: Boolean
    },
    caos: {
        type: Number
    },
    moto: {
        type: String
    },
    coto: {
        type: Number
    },
    caia: {
        type: String
    },
    post: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Post',
        unique: true,
        required: [true, 'Debe existir una referencia a un post']
    }
});
//Esto es como un trigger que se dispara antes de guardarlo en la BD
eventSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Event = mongoose_1.model('Event', eventSchema);
