import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autentication';
import { FileUpload } from '../interfaces/file-upload';
import FileSystem from '../classes/file-system';
import { Asistente } from '../models/asistente.model';
const xlsx = require("xlsx");
const asistenteRoutes = Router();
const fileSystem = new FileSystem();

var ObjectID = require('mongodb').ObjectID;

asistenteRoutes.post('/', [ verificaToken], (req:any, res: Response) => {

    const body = req.body;

    Asistente.create(body).then( async asistenteDB => {

        await asistenteDB.populate('post').execPopulate();

        res.json({
            ok: true,
            asistente: asistenteDB
        });    

    }).catch( err => {
        res.json(err)
    });
});


asistenteRoutes.get('/', async (req: any, res: Response) => {

    const postId = req.query.postid;

    const asistentes = await Asistente.find({'post': ObjectID(postId)})
    .sort({ _id: -1})
    .populate('post')
    .exec();

    res.json({
        ok: true,
        asistentes
    });

});

asistenteRoutes.get('/evaluate/:postid/:dni', async (req: any, res: Response) => {

    const postId = req.params.postid;
    const dni = req.params.dni;

    Asistente
    .findOne({'post': ObjectID(postId), 'dni': dni})
    .exec(function(err, asistente){
        if( err ) throw err;
        if(!asistente){
            return res.json({
                ok: false,
                mensaje: 'No existe un asistente con ese código'
            });
        }

        res.json({
            ok: true,
            asistente
        });
    });
});

//Servicio para subir archivos
asistenteRoutes.post('/upload/:postid', [ verificaToken ],  async (req: any, res: Response) => {

    const postId = req.params.postid;
    var cant = 0;

    if(!req.files){
        return res.status(400).json({
            ok: true,
            message: 'No se pudo subir el file'
        });
    }

    const file:FileUpload = req.files.file;

    if(!file){
        return res.status(400).json({
            ok: true,
            message: 'No se subio ningún archivo - image'
        });
    }

    /*if( !file.mimetype.includes('image')){
        return res.status(400).json({
            ok: true,
            message: 'Lo que subió no es una imagen'
        });
    }*/

    const path = await fileSystem.guardarImagenTemporal(file, req.usuario._id);

    const wb = xlsx.readFile(path);

    const sheets = wb.SheetNames;

    for (let index = 0; index < sheets.length; index++) {
        var ws = wb.Sheets[sheets[index]];
        var data = xlsx.utils.sheet_to_json(ws);
        data.map(function(record: any){
            record.post = postId;
            Asistente.create(record);
            cant++;
        });
    }

    res.json({
        ok: true,
        file: file,
        cant: cant
    });

});

export default asistenteRoutes;