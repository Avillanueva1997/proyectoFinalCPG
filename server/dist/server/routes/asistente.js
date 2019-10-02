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
const file_system_1 = __importDefault(require("../classes/file-system"));
const asistente_model_1 = require("../models/asistente.model");
const xlsx = require("xlsx");
const asistenteRoutes = express_1.Router();
const fileSystem = new file_system_1.default();
var ObjectID = require('mongodb').ObjectID;
asistenteRoutes.post('/', [autentication_1.verificaToken], (req, res) => {
    const body = req.body;
    asistente_model_1.Asistente.create(body).then((asistenteDB) => __awaiter(this, void 0, void 0, function* () {
        yield asistenteDB.populate('post').execPopulate();
        res.json({
            ok: true,
            asistente: asistenteDB
        });
    })).catch(err => {
        res.json(err);
    });
});
asistenteRoutes.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const postId = req.query.postid;
    const asistentes = yield asistente_model_1.Asistente.find({ 'post': ObjectID(postId) })
        .sort({ _id: -1 })
        .populate('post')
        .exec();
    res.json({
        ok: true,
        asistentes
    });
}));
asistenteRoutes.get('/evaluate/:postid/:dni', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const postId = req.params.postid;
    const dni = req.params.dni;
    asistente_model_1.Asistente
        .findOne({ 'post': ObjectID(postId), 'dni': dni })
        .exec(function (err, asistente) {
        if (err)
            throw err;
        if (!asistente) {
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
}));
//Servicio para subir archivos
asistenteRoutes.post('/upload/:postid', [autentication_1.verificaToken], (req, res) => __awaiter(this, void 0, void 0, function* () {
    const postId = req.params.postid;
    if (!req.files) {
        return res.status(400).json({
            ok: true,
            message: 'No se pudo subir el file'
        });
    }
    const file = req.files.file;
    if (!file) {
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
    const path = yield fileSystem.guardarImagenTemporal(file, req.usuario._id);
    const wb = xlsx.readFile(path);
    const sheets = wb.SheetNames;
    for (let index = 0; index < sheets.length; index++) {
        var ws = wb.Sheets[sheets[index]];
        var data = xlsx.utils.sheet_to_json(ws);
        var finalData = data.map(function (record) {
            record.post = postId;
        });
        console.log(finalData);
    }
    console.log(sheets);
    res.json({
        ok: true,
        file: file
    });
}));
exports.default = asistenteRoutes;
