
// Clase comun; se le pone default ya que este archivo solo tiene una clase que se va a exportar

import express from 'express';

export default class Server {
    public app: express.Application;
    public port: number = 3000;

    constructor(){
        this.app = express();
    }

    start(callback: (...args: any[]) => void){
        this.app.listen( this.port, callback );

    }


}