import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autentication';
import { Post } from '../models/post.model';
import { FileUpload } from '../interfaces/file-upload';
import FileSystem from '../classes/file-system';
import { Event } from '../models/event.model';
import { Asistente } from '../models/asistente.model';
import { Sala } from '../models/sala.model';

const salaRoutes = Router();
const fileSystem = new FileSystem();

var ObjectID = require('mongodb').ObjectID;

salaRoutes.post('/', [ verificaToken], (req:any, res: Response) => {

    const body = req.body;

    Sala.create(body).then( async salaDB => {

        await salaDB.populate('post').execPopulate();

        res.json({
            ok: true,
            sala: salaDB
        });    

    }).catch( err => {
        res.json(err)
    });
});


salaRoutes.get('/', async (req: any, res: Response) => {

    const postId = req.query.postid;

    const salas = await Sala.find({'post': ObjectID(postId)})
    .sort({ _id: -1})
    .populate('post')
    .exec();

    res.json({
        ok: true,
        salas
    });

});

export default salaRoutes;