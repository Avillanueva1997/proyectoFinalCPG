import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { SalaService } from '../../services/sala.service';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-modal-edit-sala',
  templateUrl: './modal-edit-sala.page.html',
  styleUrls: ['./modal-edit-sala.page.scss'],
})
export class ModalEditSalaPage implements OnInit {

  @Input() sala: any;


  constructor(private modalCtrl: ModalController,
              private toastController: ToastController,
              private salaService: SalaService,
              private uiService: UiServiceService) { }

  ngOnInit() {
    console.log(this.sala);
  }

  salirConArgumentos() {
    this.modalCtrl.dismiss({
      ok: true,
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Sala editada con éxito!',
      duration: 2000
    });
    toast.present();
  }

  async updateSala(fSala: any) {
    const name = (this.sala.name) ? this.sala.name : '';
    this.sala.name = this.capitalize(name);
    if (fSala.invalid) {
      return;
    }
    const valido = await this.salaService.updateSalaComplete(this.sala);

    if (valido) {
      this.presentToast();
      this.salirConArgumentos();
    } else {
      this.uiService.alertaInformativa('Código ya existe en la BD!');
    }

  }

  capitalize(value: string) {
    return value.replace(/(?:^|\s)\S/g, l => l.toUpperCase());
  }


}
