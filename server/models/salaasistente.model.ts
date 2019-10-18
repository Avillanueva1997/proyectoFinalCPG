import { Schema, Document, model } from 'mongoose';

const salaasistenteSchema = new Schema({

    created: {
        type: Date
    },
    sala: {
        type: Schema.Types.ObjectId,
        ref: 'Sala',
        required: [true, 'Debe existir una referencia a un sala']
    },
    asistente: {
        type: Schema.Types.ObjectId,
        ref: 'Asistente',
        required: [true, 'Debe existir una referencia a un asistente']
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, 'Debe existir una referencia a un post']
    }
});

//Esto es como un trigger que se dispara antes de guardarlo en la BD

salaasistenteSchema.pre<ISalaasistente>('save', function(next){
    this.created = new Date();
    next();
});

interface ISalaasistente extends Document {
    created: Date;
    sala: String;
    asistente: String;
    post: String;
}


export const SalaAsistente = model<ISalaasistente>('Salaasistente', salaasistenteSchema);