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
const event_model_1 = require("../models/event.model");
const eventRoutes = express_1.Router();
const fileSystem = new file_system_1.default();
var ObjectID = require('mongodb').ObjectID;
eventRoutes.post('/', [autentication_1.verificaToken], (req, res) => {
    const body = req.body;
    event_model_1.Event.create(body).then((eventDB) => __awaiter(this, void 0, void 0, function* () {
        yield eventDB.populate('post').execPopulate();
        res.json({
            ok: true,
            event: eventDB
        });
    })).catch(err => {
        res.json(err);
    });
});
eventRoutes.get('/data/:postid', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const postId = req.params.postid;
    const dataEvento = yield event_model_1.Event.findOne({ 'post': ObjectID(postId) })
        .sort({ _id: -1 })
        .populate('post')
        .exec();
    res.json({
        ok: true,
        dataEvento
    });
}));
exports.default = eventRoutes;
