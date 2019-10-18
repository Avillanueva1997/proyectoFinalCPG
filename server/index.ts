import Server from './classes/server';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import userRoutes from './routes/usuario';
import postRoutes from './routes/post';
import eventRoutes from './routes/event';
import asistenteRoutes from './routes/asistente';
import salaRoutes from './routes/sala';


const server = new Server();

// Body-parser
server.app.use( bodyParser.urlencoded({
    extended: true
}));
server.app.use( bodyParser.json());

//Cors
server.app.use(cors({origin: true, credentials: true}));


//File Upload
server.app.use(fileUpload());
//Si no se sube
//server.app.use(fileUpload(useTempFiles:true));


//Rutas de mi app
server.app.use('/user', userRoutes);
server.app.use('/posts', postRoutes);
server.app.use('/event', eventRoutes);
server.app.use('/asistente', asistenteRoutes);
server.app.use('/sala', salaRoutes);

//Conectar BD
// mongoose.connect( 'mongodb://root:CeciParedes2020@localhost:27017/cpg', 
//mongoose.connect( 'mongodb://localhost:27017/cpg', 
mongoose.connect( 'mongodb://ceci:ceci2020@157.230.171.225:27017/cpg', 
{ useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if(err) throw err;
    console.log('BD on fire!');
}) ;

server.start( () => {
    console.log(`Servidor corriendo en puerto ${ server.port }`);
});