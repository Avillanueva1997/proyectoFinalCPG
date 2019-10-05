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

asistenteRoutes.post('/updateasistencia', [ verificaToken], (req:any, res: Response) => {

    //console.log(req);
    const body = req.body;
    const date = new Date();

    Asistente.updateOne({codigo:body.codigo}, {$set:{asistio:body.state, fasistencia:date}}, function(err, resBD) {
        if (err) throw err;

        res.json({
            ok: true,
            resBD
        });

      });
});

asistenteRoutes.post('/update', [verificaToken], (req:any, res: Response) => {

    const body = req.body;
    
    let fuente = (body.fuente) ? body.fuente : '';
    let name = (body.name) ? body.name : '';
    let appaterno = (body.appaterno) ? body.appaterno : '';
    let apmaterno = (body.apmaterno) ? body.apmaterno : '';
    let empresa = (body.empresa) ? body.empresa : '';
    let cargo = (body.cargo) ? body.cargo : '';
    let tipoinvitado = (body.tipoinvitado) ? body.tipoinvitado : '';
    let telefono = (body.telefono) ? body.telefono : '';
    let email = (body.email) ? body.email : '';
    let ciudad = (body.ciudad) ? body.ciudad : '';
    let pais = (body.pais) ? body.pais : '';
    let leadsource = (body.leadsource) ? body.leadsource : '';
    let leadsourced = (body.leadsourced) ? body.leadsourced : '';
    let productinterest = (body.productinterest) ? body.productinterest : '';
    let leadowner = (body.leadowner) ? body.leadowner : '';

    const newvalues = { $set: {fuente, name, appaterno, apmaterno, empresa, cargo, tipoinvitado, telefono, email, ciudad, pais, leadsource, leadsourced, productinterest, leadowner} };

    Asistente.updateOne({codigo:body.codigo}, newvalues, function(err, resBD) {
        if (err) throw err;

        res.json({
            ok: true,
            resBD
        });
    });

    /*const date = new Date();

    Asistente.updateOne({codigo:body.codigo}, {$set:{asistio:body.state, fasistencia:date}}, function(err, resBD) {
        if (err) throw err;

        res.json({
            ok: true,
            resBD
        });

      });*/
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

asistenteRoutes.get('/search/:postid/:value', async (req: any, res: Response) => {

    const postId = req.params.postid;
    const value = req.params.value;

    var query = {};
    if (value !== undefined) {
        query = { $or : [ 
                            {"name": new RegExp(value, 'i')},
                            {"appaterno": new RegExp(value, 'i')},
                            {"apmaterno": new RegExp(value, 'i')},
                            {"empresa": new RegExp(value, 'i')},
                            {"tipoinvitado": new RegExp(value, 'i')}
                        ],
                    "post": ObjectID(postId)
                };
    }

    const asistentes = await Asistente.find(query)
    .sort({ _id: -1})
    .populate('post')
    .exec();

    res.json({
        ok: true,
        asistentes
    });

});

asistenteRoutes.get('/evaluate/:postid/:codigo', async (req: any, res: Response) => {

    const postId = req.params.postid;
    const codigo = req.params.codigo;

    Asistente
    .findOne({'post': ObjectID(postId), 'codigo': codigo})
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
    const date = new Date();

    for (let index = 0; index < sheets.length; index++) {
        var ws = wb.Sheets[sheets[index]];
        var data = xlsx.utils.sheet_to_json(ws);
        data.map(function(record: any){
            const code = record.codigo;
            const cel = record.telefono || '';
            record.codigo = code.toString();
            record.telefono = cel.toString();
            record.post = postId;
            record.created = date;
            record.fasistio = date;
            record.tipocarga = '02';
            Asistente.insertMany(record, function(err:any, res:any) {
                if(err) throw err;
            });
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