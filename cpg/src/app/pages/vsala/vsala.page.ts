import { Component, OnInit } from '@angular/core';
import { SalaService } from '../../services/sala.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-vsala',
  templateUrl: './vsala.page.html',
  styleUrls: ['./vsala.page.scss'],
})
export class VsalaPage {

  title = 'Visualizar Sala';
  post: string;
  sala: string;
  asistentes = [];
  dataGlobal = [];

  constructor(private salaService: SalaService, private storage: Storage) { }

  ionViewWillEnter() {
    this.cargarPost();
    this.cargarSala();
  }

  async cargarPost() {
    this.post = await this.storage.get('post');
  }

  async cargarSala() {
    this.sala = await this.storage.get('sala');
    this.getDataSalaAsistente();
  }

  getDataSalaAsistente() {
    this.salaService.getSalaAsistentes(this.post, this.sala).subscribe(
      response => {
        this.asistentes = response['asistentes'];
        console.log(this.asistentes);
        const tempData = [];
        for (const item of this.asistentes) {
          const data = {
                        name: item.asistente.name,
                        appaterno: item.asistente.appaterno,
                        apmaterno: item.asistente.apmaterno,
                        empresa: item.asistente.empresa,
                        tipoinvitado: item.asistente.tipoinvitado,
                        nombresala: item.sala.name,
                        created: item.created
                      };
          tempData.push(data);
        }

        this.dataGlobal = tempData;
        console.log(this.dataGlobal);
      }
    );
  }

}
