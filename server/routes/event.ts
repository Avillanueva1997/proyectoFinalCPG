import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autentication';
import { Post } from '../models/post.model';
import { FileUpload } from '../interfaces/file-upload';
import FileSystem from '../classes/file-system';
import { Event } from '../models/event.model';

const eventRoutes = Router();
const fileSystem = new FileSystem();

eventRoutes.post('/', [ verificaToken], (req:any, res: Response) => {

    const body = req.body;

    Event.create(body).then( async eventDB => {

        await eventDB.populate('post').execPopulate();

        res.json({
            ok: true,
            event: eventDB
        });    

    }).catch( err => {
        res.json(err)
    });
});

export default eventRoutes;