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
const sala_model_1 = require("../models/sala.model");
const salaasistente_model_1 = require("../models/salaasistente.model");
const salaRoutes = express_1.Router();
const fileSystem = new file_system_1.default();
var ObjectID = require('mongodb').ObjectID;
salaRoutes.post('/', [autentication_1.verificaToken], (req, res) => {
    const body = req.body;
    sala_model_1.Sala.create(body).then((salaDB) => __awaiter(this, void 0, void 0, function* () {
        yield salaDB.populate('post').execPopulate();
        res.json({
            ok: true,
            sala: salaDB
        });
    })).catch(err => {
        res.json(err);
    });
});
salaRoutes.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const postId = req.query.postid;
    const salas = yield sala_model_1.Sala.find({ 'post': ObjectID(postId) })
        .sort({ _id: -1 })
        .populate('post')
        .exec();
    res.json({
        ok: true,
        salas
    });
}));
salaRoutes.post('/update', [autentication_1.verificaToken], (req, res) => {
    const body = req.body;
    let name = (body.name) ? body.name : '';
    let tipo = body.tipo;
    let aforo = (body.aforo) ? body.aforo : 0;
    let aforosuperado = (body.aforosuperado) ? body.aforosuperado : 0;
    const newvalues = { $set: { name, tipo, aforo, aforosuperado } };
    sala_model_1.Sala.updateOne({ codigo: body.codigo }, newvalues, function (err, resBD) {
        if (err)
            throw err;
        res.json({
            ok: true,
            resBD
        });
    });
});
salaRoutes.get('/delete/:codigo', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const codigo = req.params.codigo;
    sala_model_1.Sala.deleteOne({ 'codigo': codigo }).exec(function (err, sala) {
        if (err)
            throw err;
        if (!sala) {
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
}));
salaRoutes.post('/savesa', [autentication_1.verificaToken], (req, res) => {
    const sala = req.body.sala;
    const asistente = req.body.asistente;
    const post = req.body.post;
    const body = {
        'sala': ObjectID(sala),
        'asistente': ObjectID(asistente),
        'post': ObjectID(post)
    };
    salaasistente_model_1.SalaAsistente.create(body).then((salaDB) => __awaiter(this, void 0, void 0, function* () {
        yield salaDB.populate('sala asistente post').execPopulate();
        res.json({
            ok: true,
            sala: salaDB
        });
    })).catch(err => {
        res.json(err);
    });
});
salaRoutes.get('/tablesa/:post/:sala', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const post = req.params.post;
    const sala = req.params.sala;
    const asistentes = yield salaasistente_model_1.SalaAsistente.find({ 'post': ObjectID(post), 'sala': ObjectID(sala) })
        .sort({ _id: -1 })
        .populate('post sala asistente')
        .exec();
    res.json({
        ok: true,
        asistentes
    });
}));
exports.default = salaRoutes;
