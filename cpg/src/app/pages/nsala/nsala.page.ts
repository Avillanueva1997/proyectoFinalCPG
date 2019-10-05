import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NgForm } from '@angular/forms';
import { SalaService } from '../../services/sala.service';
import { Sala } from '../../../../../server/models/sala.model';
import { UiServiceService } from '../../services/ui-service.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-nsala',
  templateUrl: './nsala.page.html',
  styleUrls: ['./nsala.page.scss'],
})
export class NsalaPage implements OnInit {

  titulo = 'Crear sala';
  post: any;
  sala: any = {};

  constructor(private storage: Storage,
              private salaService: SalaService,
              private uiService: UiServiceService,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.cargarPost();
  }

  async nuevaSala(fSala: NgForm) {
    const name = this.sala.name;
    this.sala.name = this.capitalize(name);
    this.sala.post = this.post;
    if (fSala.invalid) {
      return;
    }
    const valido = await this.salaService.createSala(this.sala);

    if (valido) {
      this.uiService.presentToast('Sala creada!');
      this.navCtrl.navigateRoot('/salas', {animated: true});
    } else {
      this.uiService.alertaInformativa('Datos duplicados!');
    }
  }

  async cargarPost() {
    this.post = await this.storage.get('post');
  }

  capitalize(value: string) {
    return value.replace(/(?:^|\s)\S/g, l => l.toUpperCase());
  }

}
