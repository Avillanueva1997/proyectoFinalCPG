import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autentication';
import { Post } from '../models/post.model';
import { FileUpload } from '../interfaces/file-upload';
import FileSystem from '../classes/file-system';
import { Event } from '../models/event.model';

const eventRoutes = Router();
const fileSystem = new FileSystem();

var ObjectID = require('mongodb').ObjectID;


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


eventRoutes.get('/data/:postid', async (req: any, res: Response) => {

    const postId = req.params.postid;

    const dataEvento = await Event.findOne({'post': ObjectID(postId)})
    .sort({ _id: -1})
    .populate('post')
    .exec();

    res.json({
        ok: true,
        dataEvento
    });

});

export default eventRoutes;