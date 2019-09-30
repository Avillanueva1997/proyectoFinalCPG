import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.page.html',
  styleUrls: ['./modal-info.page.scss'],
})
export class ModalInfoPage implements OnInit {

  @Input() nombre;
  @Input() pais;

  constructor(private modalCtrl: ModalController, private toastController: ToastController) { }

  ngOnInit(  ) {
  }

  salirConArgumentos() {

    this.modalCtrl.dismiss({
      nombre: 'Felipe',
      pais: 'España'
    });

    this.presentToast();

  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Correo enviado con éxito!',
      duration: 2000
    });
    toast.present();
  }

}
