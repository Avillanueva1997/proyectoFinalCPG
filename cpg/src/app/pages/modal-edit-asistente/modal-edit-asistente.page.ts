import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AsistenteService } from '../../services/asistente.service';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-modal-edit-asistente',
  templateUrl: './modal-edit-asistente.page.html',
  styleUrls: ['./modal-edit-asistente.page.scss'],
})
export class ModalEditAsistentePage implements OnInit {

  @Input() asistente: any;

  constructor(private modalCtrl: ModalController,
              private toastController: ToastController,
              private asistenteService: AsistenteService,
              private uiService: UiServiceService) { }

  ngOnInit() {

    console.log(this.asistente);
  }

  salirConArgumentos() {

    this.modalCtrl.dismiss({
      ok: true,
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Asistente editado con éxito!',
      duration: 2000
    });
    toast.present();
  }

  async updateAsistente(fAsistente: NgForm) {
    const fuente = (this.asistente.fuente) ? this.asistente.fuente : '';
    this.asistente.fuente = this.capitalize(fuente);
    const name = (this.asistente.name) ? this.asistente.name : '';
    this.asistente.name = this.capitalize(name);
    const appaterno = (this.asistente.appaterno) ? this.asistente.appaterno : '';
    this.asistente.appaterno = this.capitalize(appaterno);
    const apmaterno = (this.asistente.apmaterno) ? this.asistente.apmaterno : '';
    this.asistente.apmaterno = this.capitalize(apmaterno);
    const empresa = (this.asistente.empresa) ? this.asistente.empresa : '';
    this.asistente.empresa = this.capitalize(empresa);
    const cargo = (this.asistente.cargo) ? this.asistente.cargo : '';
    this.asistente.cargo = this.capitalize(cargo);
    const ciudad = (this.asistente.ciudad) ? this.asistente.ciudad : '';
    this.asistente.ciudad = this.capitalize(ciudad);
    const pais = (this.asistente.pais) ? this.asistente.pais : '';
    this.asistente.pais = this.capitalize(pais);
    const leadsource = (this.asistente.leadsource) ? this.asistente.leadsource : '';
    this.asistente.leadsource = this.capitalize(leadsource);
    const leadsourced = (this.asistente.leadsourced) ? this.asistente.leadsourced : '';
    this.asistente.leadsourced = this.capitalize(leadsourced);
    const productinterest = (this.asistente.productinterest) ? this.asistente.productinterest : '';
    this.asistente.productinterest = this.capitalize(productinterest);
    const leadowner = (this.asistente.leadowner) ? this.asistente.leadowner : '';
    this.asistente.leadowner = this.capitalize(leadowner);
    if (fAsistente.invalid) {
      return;
    }
    const valido = await this.asistenteService.updateAsistenteComplete(this.asistente);

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
