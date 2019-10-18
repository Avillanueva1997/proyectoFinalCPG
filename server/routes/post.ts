import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autentication';
import { Post } from '../models/post.model';
import { FileUpload } from '../interfaces/file-upload';
import FileSystem from '../classes/file-system';
import { SalaAsistente } from '../models/salaasistente.model';
import { Asistente } from '../models/asistente.model';

const postRoutes = Router();
const fileSystem = new FileSystem();

var ObjectID = require('mongodb').ObjectID;

postRoutes.post('/', [ verificaToken], (req:any, res: Response) => {

    const body = req.body;
    body.usuario = req.usuario._id;

    const imagenes = fileSystem.imagenesDeTempHaciaPost(req.usuario._id);
    body.imgs = imagenes;

    Post.create(body).then( async postDB => {

        await postDB.populate('usuario', '-password').execPopulate();

        res.json({
            ok: true,
            post: postDB
        });    

    }).catch( err => {
        res.json(err)
    });
});


postRoutes.get('/', async (req: any, res: Response) => {

    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;

    const posts = await Post.find()
    .sort({ _id: -1})
    .skip(skip)
    .limit(10)
    .populate('usuario', '-password')
    .exec();

    res.json({
        ok: true,
        pagina,
        posts
    });

});

//Servicio para subir archivos
postRoutes.post('/upload', [ verificaToken ],  async (req: any, res: Response) => {

    if(!req.files){
        return res.status(400).json({
            ok: true,
            message: 'No se pudo subir el file'
        });
    }

    const file:FileUpload = req.files.image;

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

    await fileSystem.guardarImagenTemporal(file, req.usuario._id);

    res.json({
        ok: true,
        file: file.mimetype
    });

});

postRoutes.get('/imagen/:userid/:img', (req: any, res: Response) => {
    const userId = req.params.userid;
    const img = req.params.img;

    const pathFoto = fileSystem.getFotoUrl( userId, img);

    res.sendFile(pathFoto);

});

postRoutes.get('/export/:postid', async (req: any, res: Response) => {

    var postId = req.params.postid;
    postId =  ObjectID(postId);

    const dataEvento = await Asistente.aggregate([{
        $lookup:  {
            from: "salaasistentes",
            localField: "_id",
            foreignField : "asistente",
            as: "asistente_sala"
        }},
        {
            $lookup:  {
                from: "salas",
                localField: "salaasistentes.sala",
                foreignField : "salas._id",
                as: "sala_info"
            }
        }
    ]);
    
    /*SalaAsistente.find({'post': ObjectID(postId)})
    .sort({ _id: -1})
    .populate('sala asistente post')
    .exec();*/

    res.json({
        ok: true,
        dataEvento
    });
});



export default postRoutes;