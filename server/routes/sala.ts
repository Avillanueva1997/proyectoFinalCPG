import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autentication';
import { Post } from '../models/post.model';
import { FileUpload } from '../interfaces/file-upload';
import FileSystem from '../classes/file-system';
import { Event } from '../models/event.model';
import { Asistente } from '../models/asistente.model';
import { Sala } from '../models/sala.model';
import { SalaAsistente } from '../models/salaasistente.model';

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

salaRoutes.post('/savesa', [verificaToken], (req:any, res: Response) => {

    const sala = req.body.sala;
    const asistente = req.body.asistente;
    const post = req.body.post;

    const body = {
        'sala': ObjectID(sala),
        'asistente': ObjectID(asistente),
        'post': ObjectID(post)
    };

    SalaAsistente.create(body).then( async salaDB => {

        await salaDB.populate('sala asistente post').execPopulate();

        res.json({
            ok: true,
            sala: salaDB
        });    

    }).catch( err => {
        res.json(err)
    });
});

salaRoutes.get('/tablesa/:post/:sala', async (req: any, res: Response) => {

    const post = req.params.post;
    const sala = req.params.sala;

    const asistentes = await SalaAsistente.find({'post': ObjectID(post), 'sala': ObjectID(sala) })
    .sort({ _id: -1})
    .populate('post sala asistente')
    .exec();

    res.json({
        ok: true,
        asistentes
    });

});

salaRoutes.get('/indicadorFour/:postid', async (req: any, res: Response) => {

    const postId = req.params.postid;
    var asistentesonsalas = 0;

    SalaAsistente
    .find({'post': ObjectID(postId)})
    .countDocuments()
    .exec( function(err, result){
        if( err ) throw err;
        if(!result){
            return res.json({
                ok: false,
                mensaje: 'No hay registros'
            });
        }
        asistentesonsalas = result;
            res.json({
                ok: true,
                asistentesonsalas
            });
    });
});


export default salaRoutes;