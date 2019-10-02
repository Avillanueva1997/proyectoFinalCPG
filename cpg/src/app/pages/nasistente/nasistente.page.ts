import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AsistenteService } from '../../services/asistente.service';
import { NavController } from '@ionic/angular';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-nasistente',
  templateUrl: './nasistente.page.html',
  styleUrls: ['./nasistente.page.scss'],
})
export class NasistentePage implements OnInit {

  asistente: any = {};

  titulo = 'Registro del asistente';

  post: any;

  constructor(private storage: Storage,
              private asistenteService: AsistenteService,
              private navCtrl: NavController,
              private uiService: UiServiceService) { }

  ngOnInit() {
    this.cargarPost();
  }

  async nuevoAsistente(fAsistente: NgForm) {
    this.asistente.post = this.post;
    if (fAsistente.invalid) {
      return;
    }
    const valido = await this.asistenteService.createAsistente(this.asistente);

    if (valido) {
      this.uiService.presentToast('Asistente creado!');
      this.storage.set('asistente', this.asistente);
      this.navCtrl.navigateRoot('/vasistente', {animated: true});
    } else {
      this.uiService.alertaInformativa('Datos duplicados!');
    }
  }

  async cargarPost() {
    this.post = await this.storage.get('post');
  }

}
