"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autentication_1 = require("../middlewares/autentication");
const post_model_1 = require("../models/post.model");
const file_system_1 = __importDefault(require("../classes/file-system"));
const asistente_model_1 = require("../models/asistente.model");
const postRoutes = express_1.Router();
const fileSystem = new file_system_1.default();
var ObjectID = require('mongodb').ObjectID;
postRoutes.post('/', [autentication_1.verificaToken], (req, res) => {
    const body = req.body;
    body.usuario = req.usuario._id;
    const imagenes = fileSystem.imagenesDeTempHaciaPost(req.usuario._id);
    body.imgs = imagenes;
    post_model_1.Post.create(body).then((postDB) => __awaiter(this, void 0, void 0, function* () {
        yield postDB.populate('usuario', '-password').execPopulate();
        res.json({
            ok: true,
            post: postDB
        });
    })).catch(err => {
        res.json(err);
    });
});
postRoutes.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;
    const posts = yield post_model_1.Post.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(10)
        .populate('usuario', '-password')
        .exec();
    res.json({
        ok: true,
        pagina,
        posts
    });
}));
//Servicio para subir archivos
postRoutes.post('/upload', [autentication_1.verificaToken], (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (!req.files) {
        return res.json({
            ok: false,
            message: 'No se pudo subir el file'
        });
    }
    const file = req.files.image;
    if (!file) {
        return res.json({
            ok: false,
            message: 'No se subio ningún archivo - image'
        });
    }
    if (!file.mimetype.includes('image')) {
        return res.json({
            ok: false,
            message: 'Lo que subió no es una imagen'
        });
    }
    yield fileSystem.guardarImagenTemporal(file, req.usuario._id);
    res.json({
        ok: true,
        file: file.mimetype
    });
}));
postRoutes.get('/imagen/:userid/:img', (req, res) => {
    const userId = req.params.userid;
    const img = req.params.img;
    const pathFoto = fileSystem.getFotoUrl(userId, img);
    res.sendFile(pathFoto);
});
postRoutes.get('/export/:postid', (req, res) => __awaiter(this, void 0, void 0, function* () {
    var postId = req.params.postid;
    postId = ObjectID(postId);
    const dataEvento = yield asistente_model_1.Asistente.aggregate([{
            $lookup: {
                from: "salaasistentes",
                localField: "_id",
                foreignField: "asistente",
                as: "asistente_sala"
            }
        },
        {
            $lookup: {
                from: "salas",
                localField: "salaasistentes.sala",
                foreignField: "salas._id",
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
}));
/*asistenteRoutes.post('/upload/:postid', [ verificaToken ],  async (req: any, res: Response) => {

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

    const path = await fileSystem.guardarImagenTemporal(file, req.usuario._id);

    const wb = xlsx.readFile(path);

    const sheets = wb.SheetNames;
    const date = new Date();

    var asistentes: any = [];

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
            if(!record.tipoinvitado) {
                record.tipoinvitado = 'Nuevo';
            }
            asistentes.push(record);
        });
    }

    var flag = "";

    for (let x = 0; x < asistentes.length; x++) {
        for (let y = 0; y < asistentes.length; y++) {
            if (x != y) {
                if (asistentes[x].codigo == asistentes[y].codigo) {
                  flag = "X";
                }
              }
        }
    }

    if(flag == "X") {
        return res.json({
            ok: false,
            message: 'Existen Duplicados!'
        });
    } else {
        for (let index = 0; index < asistentes.length; index++) {
            Asistente.insertMany(asistentes[index], function(err:any, res:any) {
                if(err) throw err;
            });
            cant++;
        }
    }

    res.json({
        ok: true,
        file: file,
        cant: cant
    });

});*/
exports.default = postRoutes;
