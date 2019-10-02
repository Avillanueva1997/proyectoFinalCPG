import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { NavController } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.page.html',
  styleUrls: ['./general-data.page.scss'],
})
export class GeneralDataPage implements OnInit {

  titulo = 'Datos Generales';

  event: any = {};

  post: any;

  constructor(private eventService: EventService,
              private navCtrl: NavController,
              private uiService: UiServiceService,
              private storage: Storage) { }

  ngOnInit() {
    this.cargarPost();
  }

  async dataEvent(fEvent: NgForm) {
    this.event.post = this.post;
    if (fEvent.invalid) {
      return;
    }
    const valido = await this.eventService.createEvent(this.event);

    if (valido) {
      this.uiService.presentToast('Datos guardados!');
      this.navCtrl.navigateRoot('/event', {animated: true});
    } else {
      this.uiService.alertaInformativa('Este evento ya tiene información guardada!');
    }
  }


  async cargarPost() {
    this.post = await this.storage.get('post');
  }

}
