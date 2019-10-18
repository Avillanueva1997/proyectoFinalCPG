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

    if(body.asistio === true){
        const fasistencia = new Date();
        body.fasistencia = fasistencia;
    }

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
    .exec();

    res.json({
        ok: true,
        asistentes
    });

});

function diacriticSensitiveRegex(string = '') {
    return string.replace(/a/g, '[a,á,à,ä]')
       .replace(/e/g, '[e,é,ë]')
       .replace(/i/g, '[i,í,ï]')
       .replace(/o/g, '[o,ó,ö,ò]')
       .replace(/u/g, '[u,ü,ú,ù]');
}

// one

asistenteRoutes.get('/search01/:postid/:value', async (req: any, res: Response) => {

    var postId = req.params.postid;
    const value = req.params.value;
    postId =  ObjectID(postId);

    var query = {};
    if (value !== undefined) {
        query = {
            name: { $regex : diacriticSensitiveRegex(value), $options: 'i' },
            post: ObjectID(postId)
        };                    
    }

    const asistentes = await Asistente.find(query)
    .sort({ _id: -1})
    .exec();

    res.json({
        ok: true,
        asistentes
    }); 
});

asistenteRoutes.get('/search17/:postid/:value', async (req: any, res: Response) => {

    var postId = req.params.postid;
    const value = req.params.value;
    postId =  ObjectID(postId);

    var query = {};
    if (value !== undefined) {
        //let reg01 = ".*" + value +".*";
        query = {
            appaterno: { $regex : diacriticSensitiveRegex(value), $options: 'i' },
            post: ObjectID(postId)
        };
    }

    const asistentes = await Asistente.find(query)
    .sort({ _id: -1})
    .exec();

    res.json({
        ok: true,
        asistentes
    }); 
});

asistenteRoutes.get('/search18/:postid/:value', async (req: any, res: Response) => {

    var postId = req.params.postid;
    const value = req.params.value;
    postId =  ObjectID(postId);

    var query = {};
    if (value !== undefined) {
        query = {
            apmaterno: { $regex : diacriticSensitiveRegex(value), $options: 'i' },
            post: ObjectID(postId)
        };
    }

    const asistentes = await Asistente.find(query)
    .sort({ _id: -1})
    .exec();

    res.json({
        ok: true,
        asistentes
    }); 
});

asistenteRoutes.get('/search19/:postid/:value', async (req: any, res: Response) => {

    var postId = req.params.postid;
    const value = req.params.value;
    postId =  ObjectID(postId);

    var query = {};
    if (value !== undefined) {
        //let reg01 = ".*" + value +".*";
        query = {
            empresa: { $regex : diacriticSensitiveRegex(value), $options: 'i' },
            post: ObjectID(postId)
        };
    }

    const asistentes = await Asistente.find(query)
    .sort({ _id: -1})
    .exec();

    res.json({
        ok: true,
        asistentes
    }); 
});

asistenteRoutes.get('/search20/:postid/:value', async (req: any, res: Response) => {

    var postId = req.params.postid;
    const value = req.params.value;
    postId =  ObjectID(postId);

    var query = {};
    if (value !== undefined) {
        //let reg01 = ".*" + value +".*";
        query = {
            tipoinvitado: { $regex : diacriticSensitiveRegex(value), $options: 'i' },
            post: ObjectID(postId)
        };
    }

    const asistentes = await Asistente.find(query)
    .sort({ _id: -1})
    .exec();

    res.json({
        ok: true,
        asistentes
    }); 
});


// Two

asistenteRoutes.get('/search02/:postid/:value/:valuetwo', async (req: any, res: Response) => {

    var postId = req.params.postid;
    const value = req.params.value;
    const valueTwo = req.params.valuetwo;
    postId =  ObjectID(postId);

    var query = {};
    if (value !== undefined && valueTwo !== undefined) {
        query = {
            $and: [
                { name: { $regex : diacriticSensitiveRegex(value), $options: 'i'} }, 
                { appaterno: { $regex : diacriticSensitiveRegex(valueTwo), $options: 'i' }},
                { post: ObjectID(postId)}
            ]
        };                    
    }

    const asistentes = await Asistente.find(query)
    .sort({ _id: -1})
    .exec();

    res.json({
        ok: true,
        asistentes
    }); 
});

asistenteRoutes.get('/search03/:postid/:value/:valuetwo', async (req: any, res: Response) => {

    var postId = req.params.postid;
    const value = req.params.value;
    const valueTwo = req.params.valueTwo;
    postId =  ObjectID(postId);

    var query = {};
    if (value !== undefined && valueTwo !== undefined) {
        query = {
            $and: [
                { name: { $regex : diacriticSensitiveRegex(value), $options: 'i'} },
                { apmaterno: { $regex : diacriticSensitiveRegex(valueTwo), $options: 'i'} },
                { post: ObjectID(postId) }                
            ]
        };                    
    }

    const asistentes = await Asistente.find(query)
    .sort({ _id: -1})
    .exec();

    res.json({
        ok: true,
        asistentes
    }); 
});

asistenteRoutes.get('/search04/:postid/:value/:valuetwo', async (req: any, res: Response) => {

    var postId = req.params.postid;
    const value = req.params.value;
    const valueTwo = req.params.valuetwo;
    postId =  ObjectID(postId);

    var query = {};
    if (value !== undefined && valueTwo !== undefined) {
        query = {
            $and: [
                {name: { $regex: diacriticSensitiveRegex(value), $options: 'i'}},
                {empresa: { $regex: diacriticSensitiveRegex(valueTwo), $options: 'i'}},
                {post: ObjectID(postId)}
            ]            
        };                    
    }

    const asistentes = await Asistente.find(query)
    .sort({ _id: -1})
    .exec();

    res.json({
        ok: true,
        asistentes
    }); 
});

asistenteRoutes.get('/search05/:postid/:value/:valuetwo', async (req: any, res: Response) => {

    var postId = req.params.postid;
    const value = req.params.value;
    const valueTwo = req.params.valuetwo;
    postId =  ObjectID(postId);

    var query = {};
    if (value !== undefined && valueTwo !== undefined) {
        query = {
            $and: [
                {name: { $regex: diacriticSensitiveRegex(value), $options: 'i'}},
                {tipoinvitado: { $regex: diacriticSensitiveRegex(valueTwo), $options: 'i'}},
                {post: ObjectID(postId)}
            ]            
        };                    
    }

    const asistentes = await Asistente.find(query)
    .sort({ _id: -1})
    .exec();

    res.json({
        ok: true,
        asistentes
    }); 
});

asistenteRoutes.get('/search21/:postid/:value/:valuetwo', async (req: any, res: Response) => {

    var postId = req.params.postid;
    const value = req.params.value;
    const valueTwo = req.params.valuetwo;
    postId =  ObjectID(postId);

    var query = {};
    if (value !== undefined && valueTwo !== undefined) {
        query = {
            $and: [
                {appaterno: { $regex: diacriticSensitiveRegex(value), $options: 'i'}},
                {apmaterno: { $regex: diacriticSensitiveRegex(valueTwo), $options: 'i'}},
                {post: ObjectID(postId)}
            ]            
        };                    
    }

    const asistentes = await Asistente.find(query)
    .sort({ _id: -1})
    .exec();

    res.json({
        ok: true,
        asistentes
    }); 
});

asistenteRoutes.get('/search22/:postid/:value/:valuetwo', async (req: any, res: Response) => {

    var postId = req.params.postid;
    const value = req.params.value;
    const valueTwo = req.params.valuetwo;
    postId =  ObjectID(postId);

    var query = {};
    if (value !== undefined && valueTwo !== undefined) {
        query = {
            $and: [
                {appaterno: { $regex: diacriticSensitiveRegex(value), $options: 'i'}},
                {empresa: { $regex: diacriticSensitiveRegex(valueTwo), $options: 'i'}},
                {post: ObjectID(postId)}
            ]            
        };                    
    }

    const asistentes = await Asistente.find(query)
    .sort({ _id: -1})
    .exec();

    res.json({
        ok: true,
        asistentes
    }); 
});

asistenteRoutes.get('/search23/:postid/:value/:valuetwo', async (req: any, res: Response) => {

    var postId = req.params.postid;
    const value = req.params.value;
    const valueTwo = req.params.valuetwo;
    postId =  ObjectID(postId);

    var query = {};
    if (value !== undefined && valueTwo !== undefined) {
        query = {
            $and: [
                {appaterno: { $regex: diacriticSensitiveRegex(value), $options: 'i'}},
                {tipoinvitado: { $regex: diacriticSensitiveRegex(valueTwo), $options: 'i'}},
                {post: ObjectID(postId)}
            ]
        };                    
    }

    const asistentes = await Asistente.find(query)
    .sort({ _id: -1})
    .exec();

    res.json({
        ok: true,
        asistentes
    }); 
});

asistenteRoutes.get('/search28/:postid/:value/:valuetwo', async (req: any, res: Response) => {

    var postId = req.params.postid;
    const value = req.params.value;
    const valueTwo = req.params.valuetwo;
    postId =  ObjectID(postId);

    var query = {};
    if (value !== undefined && valueTwo !== undefined) {
        query = {
            $and: [
                {apmaterno: { $regex: diacriticSensitiveRegex(value), $options: 'i'}},
                {empresa: { $regex: diacriticSensitiveRegex(valueTwo), $options: 'i'}},
                {post: ObjectID(postId)}
            ]            
        };                    
    }

    const asistentes = await Asistente.find(query)
    .sort({ _id: -1})
    .exec();

    res.json({
        ok: true,
        asistentes
    }); 
});

asistenteRoutes.get('/search29/:postid/:value/:valuetwo', async (req: any, res: Response) => {

    var postId = req.params.postid;
    const value = req.params.value;
    const valueTwo = req.params.valuetwo;
    postId =  ObjectID(postId);

    var query = {};
    if (value !== undefined && valueTwo !== undefined) {
        query = {
            $and: [
                {apmaterno: { $regex: diacriticSensitiveRegex(value), $options: 'i'}},
                {tipoinvitado: { $regex: diacriticSensitiveRegex(valueTwo), $options: 'i'}},
                {post: ObjectID(postId)}
            ]            
        };                    
    }

    const asistentes = await Asistente.find(query)
    .sort({ _id: -1})
    .exec();

    res.json({
        ok: true,
        asistentes
    }); 
});

asistenteRoutes.get('/search31/:postid/:value/:valuetwo', async (req: any, res: Response) => {

    var postId = req.params.postid;
    const value = req.params.value;
    const valueTwo = req.params.valuetwo;
    postId =  ObjectID(postId);

    var query = {};
    if (value !== undefined && valueTwo !== undefined) {
        query = {
            $and: [
                {empresa: { $regex: diacriticSensitiveRegex(value), $options: 'i'}},
                {tipoinvitado: { $regex: diacriticSensitiveRegex(valueTwo), $options: 'i'}},
                {post: ObjectID(postId)}
            ]            
        };                    
    }

    const asistentes = await Asistente.find(query)
    .sort({ _id: -1})
    .exec();

    res.json({
        ok: true,
        asistentes
    }); 
});


// Three

asistenteRoutes.get('/search06/:postid/:value/:valuetwo/:valuethree', async (req: any, res: Response) => {

    var postId = req.params.postid;
    const value = req.params.value;
    const valueTwo = req.params.valuetwo;
    const valueThree = req.params.valuethree;
    postId =  ObjectID(postId);

    var query = {};
    if (value !== undefined && valueTwo !== undefined && valueThree !== undefined) {
        query = {
            $and: [
                {name: { $regex: diacriticSensitiveRegex(value), $options: 'i'}},
                {appaterno: { $regex: diacriticSensitiveRegex(valueTwo), $options: 'i'}},
                {apmaterno: { $regex: diacriticSensitiveRegex(valueThree), $options: 'i'}},
                {post: ObjectID(postId)}
            ]            
        };                    
    }

    const asistentes = await Asistente.find(query)
    .sort({ _id: -1})
    .exec();

    res.json({
        ok: true,
        asistentes
    }); 
});

asistenteRoutes.get('/search07/:postid/:value/:valuetwo/:valuethree', async (req: any, res: Response) => {

    var postId = req.params.postid;
    const value = req.params.value;
    const valueTwo = req.params.valuetwo;
    const valueThree = req.params.valuethree;
    postId =  ObjectID(postId);

    var query = {};
    if (value !== undefined && valueTwo !== undefined && valueThree !== undefined) {
        query = {
            $and: [
                {name: { $regex: diacriticSensitiveRegex(value), $options: 'i'}},
                {appaterno: { $regex: diacriticSensitiveRegex(valueTwo), $options: 'i'}},
                {empresa: { $regex: diacriticSensitiveRegex(valueThree), $options: 'i'}},
                {post: ObjectID(postId)}
            ]            
        };                    
    }

    const asistentes = await Asistente.find(query)
    .sort({ _id: -1})
    .exec();

    res.json({
        ok: true,
        asistentes
    }); 
});

asistenteRoutes.get('/search08/:postid/:value/:valuetwo/:valuethree', async (req: any, res: Response) => {

    var postId = req.params.postid;
    const value = req.params.value;
    const valueTwo = req.params.valuetwo;
    const valueThree = req.params.valuethree;
    postId =  ObjectID(postId);

    var query = {};
    if (value !== undefined && valueTwo !== undefined && valueThree !== undefined) {
        query = {
            $and: [
                {name: { $regex: diacriticSensitiveRegex(value), $options: 'i'}},
                {appaterno: { $regex: diacriticSensitiveRegex(valueTwo), $options: 'i'}},
                {tipoinvitado: { $regex: diacriticSensitiveRegex(valueThree), $options: 'i'}},
                {post: ObjectID(postId)}
            ]            
        };                    
    }

    const asistentes = await Asistente.find(query)
    .sort({ _id: -1})
    .exec();

    res.json({
        ok: true,
        asistentes
    }); 
});

asistenteRoutes.get('/search09/:postid/:value/:valuetwo/:valuethree', async (req: any, res: Response) => {

    var postId = req.params.postid;
    const value = req.params.value;
    const valueTwo = req.params.valuetwo;
    const valueThree = req.params.valuethree;
    postId =  ObjectID(postId);

    var query = {};
    if (value !== undefined && valueTwo !== undefined && valueThree !== undefined) {
        query = {
            $and: [
                {name: { $regex: diacriticSensitiveRegex(value), $options: 'i'}},
                {apmaterno: { $regex: diacriticSensitiveRegex(valueTwo), $options: 'i'}},
                {empresa: { $regex: diacriticSensitiveRegex(valueThree), $options: 'i'}},
                {post: ObjectID(postId)}
            ]            
        };                    
    }

    const asistentes = await Asistente.find(query)
    .sort({ _id: -1})
    .exec();

    res.json({
        ok: true,
        asistentes
    }); 
});

asistenteRoutes.get('/search10/:postid/:value/:valuetwo/:valuethree', async (req: any, res: Response) => {

    var postId = req.params.postid;
    const value = req.params.value;
    const valueTwo = req.params.valuetwo;
    const valueThree = req.params.valuethree;
    postId =  ObjectID(postId);

    var query = {};
    if (value !== undefined && valueTwo !== undefined && valueThree !== undefined) {
        query = {
            $and: [
                {name: { $regex: diacriticSensitiveRegex(value), $options: 'i'}},
                {apmaterno: { $regex: diacriticSensitiveRegex(valueTwo), $options: 'i'}},
                {tipoinvitado: { $regex: diacriticSensitiveRegex(valueThree), $options: 'i'}},
                {post: ObjectID(postId)}
            ]
        };                    
    }

    const asistentes = await Asistente.find(query)
    .sort({ _id: -1})
    .exec();

    res.json({
        ok: true,
        asistentes
    }); 
});

asistenteRoutes.get('/search11/:postid/:value/:valuetwo/:valuethree', async (req: any, res: Response) => {

    var postId = req.params.postid;
    const value = req.params.value;
    const valueTwo = req.params.valuetwo;
    const valueThree = req.params.valuethree;
    postId =  ObjectID(postId);

    var query = {};
    if (value !== undefined && valueTwo !== undefined && valueThree !== undefined) {
        query = {
            $and: [
                {name: { $regex: diacriticSensitiveRegex(value), $options: 'i'}},
                {empresa: { $regex: diacriticSensitiveRegex(valueTwo), $options: 'i'}},
                {tipoinvitado: { $regex: diacriticSensitiveRegex(valueThree), $options: 'i'}},
                {post: ObjectID(postId)}
            ]
        };                    
    }

    const asistentes = await Asistente.find(query)
    .sort({ _id: -1})
    .exec();

    res.json({
        ok: true,
        asistentes
    }); 
});

asistenteRoutes.get('/search24/:postid/:value/:valuetwo/:valuethree', async (req: any, res: Response) => {

    var postId = req.params.postid;
    const value = req.params.value;
    const valueTwo = req.params.valuetwo;
    const valueThree = req.params.valuethree;
    postId =  ObjectID(postId);

    var query = {};
    if (value !== undefined && valueTwo !== undefined && valueThree !== undefined) {
        query = {
            $and: [
                {appaterno: { $regex: diacriticSensitiveRegex(value), $options: 'i'}},
                {apmaterno: { $regex: diacriticSensitiveRegex(valueTwo), $options: 'i'}},
                {empresa: { $regex: diacriticSensitiveRegex(valueThree), $options: 'i'}},
                {post: ObjectID(postId)}
            ]            
        };                    
    }

    const asistentes = await Asistente.find(query)
    .sort({ _id: -1})
    .exec();

    res.json({
        ok: true,
        asistentes
    }); 
});

asistenteRoutes.get('/search25/:postid/:value/:valuetwo/:valuethree', async (req: any, res: Response) => {

    var postId = req.params.postid;
    const value = req.params.value;
    const valueTwo = req.params.valuetwo;
    const valueThree = req.params.valuethree;
    postId =  ObjectID(postId);

    var query = {};
    if (value !== undefined && valueTwo !== undefined && valueThree !== undefined) {
        query = {
            $and: [
                {appaterno: { $regex: diacriticSensitiveRegex(value), $options: 'i'}},
                {apmaterno: { $regex: diacriticSensitiveRegex(valueTwo), $options: 'i'}},
                {tipoinvitado: { $regex: diacriticSensitiveRegex(valueThree), $options: 'i'}},
                {post: ObjectID(postId)}
            ]            
        };                    
    }

    const asistentes = await Asistente.find(query)
    .sort({ _id: -1})
    .exec();

    res.json({
        ok: true,
        asistentes
    }); 
});

asistenteRoutes.get('/search26/:postid/:value/:valuetwo/:valuethree', async (req: any, res: Response) => {

    var postId = req.params.postid;
    const value = req.params.value;
    const valueTwo = req.params.valuetwo;
    const valueThree = req.params.valuethree;
    postId =  ObjectID(postId);

    var query = {};
    if (value !== undefined && valueTwo !== undefined && valueThree !== undefined) {
        query = {
            $and: [
                {appaterno: { $regex: diacriticSensitiveRegex(value), $options: 'i'}},
                {empresa: { $regex: diacriticSensitiveRegex(valueTwo), $options: 'i'}},
                {tipoinvitado: { $regex: diacriticSensitiveRegex(valueThree), $options: 'i'}},
                {post: ObjectID(postId)}
            ]            
        };                    
    }

    const asistentes = await Asistente.find(query)
    .sort({ _id: -1})
    .exec();

    res.json({
        ok: true,
        asistentes
    }); 
});

asistenteRoutes.get('/search30/:postid/:value/:valuetwo/:valuethree', async (req: any, res: Response) => {

    var postId = req.params.postid;
    const value = req.params.value;
    const valueTwo = req.params.valuetwo;
    const valueThree = req.params.valuethree;
    postId =  ObjectID(postId);

    var query = {};
    if (value !== undefined && valueTwo !== undefined && valueThree !== undefined) {
        query = {
            $and: [
                {apmaterno: { $regex: diacriticSensitiveRegex(value), $options: 'i'}},
                {empresa: { $regex: diacriticSensitiveRegex(valueTwo), $options: 'i'}},
                {tipoinvitado: { $regex: diacriticSensitiveRegex(valueThree), $options: 'i'}},
                {post: ObjectID(postId)}
            ]            
        };                    
    }

    const asistentes = await Asistente.find(query)
    .sort({ _id: -1})
    .exec();

    res.json({
        ok: true,
        asistentes
    }); 
});

// Four

asistenteRoutes.get('/search12/:postid/:value/:valuetwo/:valuethree/:valuefour', async (req: any, res: Response) => {

    var postId = req.params.postid;
    const value = req.params.value;
    const valueTwo = req.params.valuetwo;
    const valueThree = req.params.valuethree;
    const valueFour = req.params.valuefour;
    postId =  ObjectID(postId);

    var query = {};
    if (value !== undefined && valueTwo !== undefined && valueThree !== undefined && valueFour !== undefined) {
        query = {
            $and: [
                {name: { $regex: diacriticSensitiveRegex(value), $options: 'i'}},
                {appaterno: { $regex: diacriticSensitiveRegex(valueTwo), $options: 'i'}},
                {apmaterno: { $regex: diacriticSensitiveRegex(valueThree), $options: 'i'}},
                {empresa: { $regex: diacriticSensitiveRegex(valueFour), $options: 'i'}},
                {post: ObjectID(postId)}
            ]            
        };                    
    }

    const asistentes = await Asistente.find(query)
    .sort({ _id: -1})
    .exec();

    res.json({
        ok: true,
        asistentes
    }); 
});

asistenteRoutes.get('/search13/:postid/:value/:valuetwo/:valuethree/:valuefour', async (req: any, res: Response) => {

    var postId = req.params.postid;
    const value = req.params.value;
    const valueTwo = req.params.valuetwo;
    const valueThree = req.params.valuethree;
    const valueFour = req.params.valuefour;
    postId =  ObjectID(postId);

    var query = {};
    if (value !== undefined && valueTwo !== undefined && valueThree !== undefined && valueFour !== undefined) {
        query = {
            $and: [
                {name: { $regex: diacriticSensitiveRegex(value), $options: 'i'}},
                {appaterno: { $regex: diacriticSensitiveRegex(valueTwo), $options: 'i'}},
                {apmaterno: { $regex: diacriticSensitiveRegex(valueThree), $options: 'i'}},
                {namtipoinvitadoe: { $regex: diacriticSensitiveRegex(valueFour), $options: 'i'}},
                {post: ObjectID(postId)}
            ]
        };                    
    }

    const asistentes = await Asistente.find(query)
    .sort({ _id: -1})
    .exec();

    res.json({
        ok: true,
        asistentes
    }); 
});

asistenteRoutes.get('/search14/:postid/:value/:valuetwo/:valuethree/:valuefour', async (req: any, res: Response) => {

    var postId = req.params.postid;
    const value = req.params.value;
    const valueTwo = req.params.valuetwo;
    const valueThree = req.params.valuethree;
    const valueFour = req.params.valuefour;
    postId =  ObjectID(postId);

    var query = {};
    if (value !== undefined && valueTwo !== undefined && valueThree !== undefined && valueFour !== undefined) {
        query = {
            $and: [
                {name: { $regex: diacriticSensitiveRegex(value), $options: 'i'}},
                {appaterno: { $regex: diacriticSensitiveRegex(valueTwo), $options: 'i'}},
                {empresa: { $regex: diacriticSensitiveRegex(valueThree), $options: 'i'}},
                {tipoinvitado: { $regex: diacriticSensitiveRegex(valueFour), $options: 'i'}},
                {post: ObjectID(postId)}
            ]
        };                    
    }

    const asistentes = await Asistente.find(query)
    .sort({ _id: -1})
    .exec();

    res.json({
        ok: true,
        asistentes
    }); 
});

asistenteRoutes.get('/search15/:postid/:value/:valuetwo/:valuethree/:valuefour', async (req: any, res: Response) => {

    var postId = req.params.postid;
    const value = req.params.value;
    const valueTwo = req.params.valuetwo;
    const valueThree = req.params.valuethree;
    const valueFour = req.params.valuefour;
    postId =  ObjectID(postId);

    var query = {};
    if (value !== undefined && valueTwo !== undefined && valueThree !== undefined && valueFour !== undefined) {
        query = {
            $and: [
                {name: { $regex: diacriticSensitiveRegex(value), $options: 'i'}},
                {apmaterno: { $regex: diacriticSensitiveRegex(valueTwo), $options: 'i'}},
                {empresa: { $regex: diacriticSensitiveRegex(valueThree), $options: 'i'}},
                {tipoinvitado: { $regex: diacriticSensitiveRegex(valueFour), $options: 'i'}},
                {post: ObjectID(postId)}
            ]            
        };                    
    }

    const asistentes = await Asistente.find(query)
    .sort({ _id: -1})
    .exec();

    res.json({
        ok: true,
        asistentes
    }); 
});

asistenteRoutes.get('/search27/:postid/:value/:valuetwo/:valuethree/:valuefour', async (req: any, res: Response) => {

    var postId = req.params.postid;
    const value = req.params.value;
    const valueTwo = req.params.valuetwo;
    const valueThree = req.params.valuethree;
    const valueFour = req.params.valuefour;
    postId =  ObjectID(postId);

    var query = {};
    if (value !== undefined && valueTwo !== undefined && valueThree !== undefined && valueFour !== undefined) {
        query = {
            $and: [
                {appaterno: { $regex: diacriticSensitiveRegex(value), $options: 'i'}},
                {apmaterno: { $regex: diacriticSensitiveRegex(valueTwo), $options: 'i'}},
                {empresa: { $regex: diacriticSensitiveRegex(valueThree), $options: 'i'}},
                {tipoinvitado: { $regex: diacriticSensitiveRegex(valueFour), $options: 'i'}},
                {post: ObjectID(postId)}
            ]            
        };                    
    }

    const asistentes = await Asistente.find(query)
    .sort({ _id: -1})
    .exec();

    res.json({
        ok: true,
        asistentes
    }); 
});

// Five

asistenteRoutes.get('/search16/:postid/:value/:valuetwo/:valuethree/:valuefour/:valuefive', async (req: any, res: Response) => {

    var postId = req.params.postid;
    const value = req.params.value;
    const valueTwo = req.params.valuetwo;
    const valueThree = req.params.valuethree;
    const valueFour = req.params.valuefour;
    const valueFive = req.params.valuefive;
    postId =  ObjectID(postId);

    var query = {};
    if (value !== undefined && valueTwo !== undefined && valueThree !== undefined && valueFour !== undefined && valueFive !== undefined) {
        query = {
            $and: [
                {name: { $regex: diacriticSensitiveRegex(value), $options: 'i'}},
                {appaterno: { $regex: diacriticSensitiveRegex(valueTwo), $options: 'i'}},
                {apmaterno: { $regex: diacriticSensitiveRegex(valueThree), $options: 'i'}},
                {empresa: { $regex: diacriticSensitiveRegex(valueFour), $options: 'i'}},
                {tipoinvitado: { $regex: diacriticSensitiveRegex(valueFive), $options: 'i'}},
                {post: ObjectID(postId)}
            ]
        };                    
    }

    const asistentes = await Asistente.find(query)
    .sort({ _id: -1})
    .exec();

    res.json({
        ok: true,
        asistentes
    }); 
});


// Others

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

asistenteRoutes.get('/indicadorOne/:postid', async (req: any, res: Response) => {

    const postId = req.params.postid;
    var cargaindividual = 0;

    Asistente
    .find({'post': ObjectID(postId), 'tipocarga': '01' })
    .countDocuments()
    .exec(function(err, result){
        if( err ) throw err;
        if(!result){
            return res.json({
                ok: false,
                mensaje: 'No hay registros'
            });
        }
        cargaindividual = result;

        res.json({
            ok: true,
            cargaindividual
        });
    });
});

asistenteRoutes.get('/indicadorTwo/:postid', async (req: any, res: Response) => {

    const postId = req.params.postid;
    var cargamasiva = 0;

    Asistente
    .find({'post': ObjectID(postId), 'tipocarga': '02' })
    .countDocuments()
    .exec( function(err, result){
        if( err ) throw err;
        if(!result){
            return res.json({
                ok: false,
                mensaje: 'No hay registros'
            });
        }
            cargamasiva = result;
            res.json({
                ok: true,
                cargamasiva
            });
    });
});

asistenteRoutes.get('/indicadorThree/:postid', async (req: any, res: Response) => {

    const postId = req.params.postid;
    var invitadoson = 0;

    Asistente
    .find({'post': ObjectID(postId), 'tipocarga': '02', asistio: true })
    .countDocuments()
    .exec( function(err, result){
        if( err ) throw err;
        if(!result){
            return res.json({
                ok: false,
                mensaje: 'No hay registros'
            });
        }
            invitadoson = result;
            res.json({
                ok: true,
                invitadoson
            });
    });
});

asistenteRoutes.get('/codigo/:nombre', async (req: any, res: Response) => {

    const nombre = req.params.nombre;
    var codigoC = nombre + '001';
    var re = new RegExp(`^${nombre}`); 

    Asistente
    .find({ codigo: re})
    .sort({ codigo: -1 })
    .limit(1)
    .exec( function(err, result: any){
        if( err ) throw err;
        if(result.length === 0){
            return res.json({
                ok: false,
                code: codigoC,
                mensaje: 'No hay registros'
            });
        }
        let lastCode = result[0].codigo;
        lastCode = lastCode.substring(3);
        lastCode = Number(lastCode) + 1;
        lastCode = lastCode.toString();
        lastCode = lastCode.padStart(3, '0');
        lastCode = nombre + lastCode;
        
        res.json({
            ok: true,
            code: lastCode
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

});

asistenteRoutes.get('/delete/:codigo', async (req: any, res: Response) => {

    const codigo = req.params.codigo;

    Asistente.deleteOne( {'codigo': codigo}).exec(function(err, asistente){
        if( err ) throw err;
        if(!asistente){
            return res.json({
                ok: false,
                mensaje: 'No existe una sala con ese código'
            });
        }

        res.json({
            ok: true,
            asistente
        });

    });
});

export default asistenteRoutes;