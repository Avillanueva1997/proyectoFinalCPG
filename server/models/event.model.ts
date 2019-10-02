import { Schema, Document, model } from 'mongoose';

const eventSchema = new Schema({

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
        type: Schema.Types.ObjectId,
        ref: 'Post',
        unique: true,
        required: [true, 'Debe existir una referencia a un post']
    }
});

//Esto es como un trigger que se dispara antes de guardarlo en la BD

eventSchema.pre<IEvent>('save', function(next){
    this.created = new Date();
    next();
});

interface IEvent extends Document {
    created: Date;
    description: String;
    place: String;
    organizador: String;
    cargo: String;
    email: String;
    telf: String;
    fein: Date;
    fefn: Date;
    hrin: Date;
    hrfn: Date;
    lios: Boolean;
    caos: Number;
    moto: String;
    coto: Number;
    caia: String;
    post: String;
}


export const Event = model<IEvent>('Event', eventSchema);