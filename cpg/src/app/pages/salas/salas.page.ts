import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SalaService } from '../../services/sala.service';
import { Sala } from 'src/app/interfaces/interfaces';
import { TouchSequence } from 'selenium-webdriver';
import { ModalEditSalaPage } from '../modal-edit-sala/modal-edit-sala.page';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-salas',
  templateUrl: './salas.page.html',
  styleUrls: ['./salas.page.scss'],
})
export class SalasPage {

  post: any;

  titulo = 'Salas';

  salas: Sala[] = [];

  constructor(private storage: Storage,
              private salaService: SalaService,
              private modalCtrl: ModalController,
              private navCtrl: NavController) { }

  ionViewWillEnter() {
    this.cargarPost();
  }

  async cargarPost() {
    this.post = await this.storage.get('post');
    this.cargarSalas(this.post);
  }

  cargarSalas(post, event?: any) {
    this.salaService.getSalas(post).subscribe(
      response => {
        if(response['ok']){
          this.salas = response['salas'];
          if (event) {
            event.target.complete();
          }
        }
      }
    );
  }

  recargar(event: any) {
    this.cargarSalas(this.post, event);
  }

  async onEdit(sala: any) {
    const modal = await this.modalCtrl.create({
      component: ModalEditSalaPage,
      componentProps: {
        sala
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log('Retorno del modal', data );
    this.recargar(sala.post);
  }

  onDelete(sala: any) {
    const codigo = sala.codigo;
    this.salaService.deleteSala(codigo).subscribe(
      response => {
        if(response['ok']){
          this.salas = response['salas'];
          this.recargar(sala.post);
        }
      }
    );
  }

  onWatch(sala: any) {
    this.navCtrl.navigateRoot('/vsala', {animated: true});
    this.storage.set('sala', sala._id);
  }
}
