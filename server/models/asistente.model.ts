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
        type: Schema.Types.ObjectId,
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

asistenteSchema.pre<IAsistente>('save', function(next){
    this.created = new Date();
    this.fasistencia = new Date();
    next();
});

interface IAsistente extends Document {
    created: Date;
    codigo: String;
    fuente: String;
    name: String;
    appaterno: String;
    apmaterno: String;
    empresa: String;
    cargo: String;
    tipoinvitado: String;
    email: String;
    telefono: String;
    ciudad: String;
    pais: String;
    leadsource: String;
    leadsourced: String;
    productinterest: String;
    leadowner: String;
    post: String;
    asistio: Boolean;
    fasistencia: Date;
    tipocarga: String;
}


export const Asistente = model<IAsistente>('Asistente', asistenteSchema);