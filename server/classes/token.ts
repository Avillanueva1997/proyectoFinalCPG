import jwt from 'jsonwebtoken';
import { resolve } from 'url';
import { rejects } from 'assert';

export default class Token {
    private static seed: string = 'proyecto-cpg-by-angel-villanueva';
    private static caducidad: string = '30d';
    
    constructor(){}

    static getJwtToken( payload: any):string{
        return jwt.sign({usuario:payload},this.seed, {expiresIn: this.caducidad});
    }

    static comprobarToken( userToken: string){

        return new Promise((resolve, reject) => {

            jwt.verify( userToken, this.seed, (err: any, decoded: any) => {
                if(err){
                    //No confiar
                    reject();
                } else {
                    //token válido
                    resolve(decoded);
                }
            });

        });
    }

}