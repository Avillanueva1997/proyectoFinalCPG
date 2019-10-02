import { Schema, Document, model } from 'mongoose';

const asistenteSchema = new Schema({

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
        type: Schema.Types.ObjectId,
        required: [true, 'Debe existir una referencia a un post']
    }
});

//Esto es como un trigger que se dispara antes de guardarlo en la BD

asistenteSchema.pre<IAsistente>('save', function(next){
    this.created = new Date();
    next();
});

interface IAsistente extends Document {
    created: Date;
    codigo: String;
    tipoinvitado: String;
    name: String;
    appaterno: String;
    apmaterno: String;
    empresa: String;
    dni: String;
    celular: String;
    email: String;
    comentarios: String;
    post: String;
}


export const Asistente = model<IAsistente>('Asistente', asistenteSchema);