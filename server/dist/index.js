"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const post_1 = __importDefault(require("./routes/post"));
const event_1 = __importDefault(require("./routes/event"));
const asistente_1 = __importDefault(require("./routes/asistente"));
const sala_1 = __importDefault(require("./routes/sala"));
const server = new server_1.default();
// Body-parser
server.app.use(body_parser_1.default.urlencoded({
    extended: true
}));
server.app.use(body_parser_1.default.json());
//Cors
server.app.use(cors_1.default({ origin: true, credentials: true }));
//File Upload
server.app.use(express_fileupload_1.default());
//Si no se sube
//server.app.use(fileUpload(useTempFiles:true));
//Rutas de mi app
server.app.use('/user', usuario_1.default);
server.app.use('/posts', post_1.default);
server.app.use('/event', event_1.default);
server.app.use('/asistente', asistente_1.default);
server.app.use('/sala', sala_1.default);
//Conectar BD
// mongoose.connect( 'mongodb://root:CeciParedes2020@localhost:27017/cpg', 
//mongoose_1.default.connect('mongodb://ceci:ceci2020@157.230.171.225:27017/cpg', 
mongoose.connect( 'mongodb://localhost:27017/cpg', 
{ useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if (err)
        throw err;
    console.log('BD on fire!');
});
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});
