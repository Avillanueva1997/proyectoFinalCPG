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

salaRoutes.post('/update', [verificaToken], (req:any, res: Response) => {

    const body = req.body;
    
    let name = (body.name) ? body.name : '';
    let tipo = body.tipo;
    let aforo = (body.aforo) ? body.aforo : 0;
    let aforosuperado = (body.aforosuperado) ? body.aforosuperado : 0;

    const newvalues = { $set: {name, tipo, aforo, aforosuperado } };

    Sala.updateOne({codigo:body.codigo}, newvalues, function(err, resBD) {
        if (err) throw err;

        res.json({
            ok: true,
            resBD
        });
    });
});

salaRoutes.get('/delete/:codigo', async (req: any, res: Response) => {

    const codigo = req.params.codigo;

    Sala.deleteOne( {'codigo': codigo}).exec(function(err, sala){
        if( err ) throw err;
        if(!sala){
            return res.json({
                ok: false,
                mensaje: 'No existe una sala con ese código'
            });
        }

        res.json({
            ok: true,
            sala
        });

    });
});


export default salaRoutes;