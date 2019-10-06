import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AsistenteService } from '../../services/asistente.service';
import { TouchSequence } from 'selenium-webdriver';
import { Asistente } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { ModalEditAsistentePage } from '../modal-edit-asistente/modal-edit-asistente.page';
import { ModalVisualizarAsistentePage } from '../modal-visualizar-asistente/modal-visualizar-asistente.page';

@Component({
  selector: 'app-asistentes',
  templateUrl: './asistentes.page.html',
  styleUrls: ['./asistentes.page.scss'],
})
export class AsistentesPage{

  titulo = 'Asistentes';
  post: any;
  asistentes: Asistente[] = [];

  constructor(private storage: Storage, private asistenteService: AsistenteService, private modalCtrl: ModalController) {
  }

  ionViewWillEnter() {
    this.cargarPost();
  }

  async cargarPost() {
    this.post = await this.storage.get('post');
    this.cargarAsistentes(this.post);
  }

  cargarAsistentes(post, event?: any) {
    this.asistenteService.getAsistentes(post).subscribe(
      response => {
        if(response['ok']){
          this.asistentes = response['asistentes'];
          if (event) {
            event.target.complete();
          }
        }
      }
    );
  }

  recargar(event: any) {
    this.cargarAsistentes(this.post, event);
  }

  onSearch(event) {
    const value = event.detail.value;
    if (value !== '') {
      this.asistenteService.getAsistentesBySearch(this.post, value).subscribe(
        response => {
          if(response['ok']){
            this.asistentes = response['asistentes'];
          }
        }
      );
    } else {
      this.cargarAsistentes(this.post);
    }
  }

  async onToggleChange(event: any, codigoBD){
    const state = event.detail.checked;
    const codigo = codigoBD;
    const params = {
      codigo,
      state
    };
    const value = await this.asistenteService.updateAsistente(params);
    if (value) {
      this.cargarAsistentes(this.post);
    }
  }

  async onEdit(asistente: any) {
      const modal = await this.modalCtrl.create({
        component: ModalEditAsistentePage,
        componentProps: {
          asistente
        }
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
      console.log('Retorno del modal', data );
  }

  async onWatch(asistente: any) {
    const modal = await this.modalCtrl.create({
      component: ModalVisualizarAsistentePage,
      componentProps: {
        asistente
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log('Retorno del modal', data );
}

}
