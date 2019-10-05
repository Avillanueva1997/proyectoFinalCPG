import { Schema, Document, model } from 'mongoose';

const salaSchema = new Schema({

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
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, 'Debe existir una referencia a un post']
    }
});

//Esto es como un trigger que se dispara antes de guardarlo en la BD

salaSchema.pre<ISala>('save', function(next){
    this.created = new Date();
    next();
});

interface ISala extends Document {
    created: Date;
    codigo: String;
    name: String;
    tipo: String;
    aforo: Number;
    aforosuperado: Number;
    post: String;
}


export const Sala = model<ISala>('Sala', salaSchema);