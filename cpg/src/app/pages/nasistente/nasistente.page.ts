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
    this.getCodigo();
  }

  async nuevoAsistente(fAsistente: NgForm) {
    const fuente = this.asistente.fuente;
    this.asistente.fuente = this.capitalize(fuente);
    const name = this.asistente.name;
    this.asistente.name = this.capitalize(name);
    const appaterno = this.asistente.appaterno;
    this.asistente.appaterno = this.capitalize(appaterno);
    const apmaterno = this.asistente.apmaterno;
    this.asistente.apmaterno = this.capitalize(apmaterno);
    const empresa = this.asistente.empresa;
    this.asistente.empresa = this.capitalize(empresa);
    const cargo = this.asistente.cargo;
    this.asistente.cargo = this.capitalize(cargo);
    const ciudad = this.asistente.ciudad;
    this.asistente.ciudad = this.capitalize(ciudad);
    const pais = this.asistente.pais;
    this.asistente.pais = this.capitalize(pais);
    const leadsource = this.asistente.leadsource;
    this.asistente.leadsource = this.capitalize(leadsource);
    const leadsourced = this.asistente.leadsourced;
    this.asistente.leadsourced = this.capitalize(leadsourced);
    const productinterest = this.asistente.productinterest;
    this.asistente.productinterest = this.capitalize(productinterest);
    const leadowner = this.asistente.leadowner;
    this.asistente.leadowner = this.capitalize(leadowner);
    this.asistente.post = this.post;
    if (fAsistente.invalid) {
      return;
    }
    const valido = await this.asistenteService.createAsistente(this.asistente);

    if (valido) {
      this.uiService.presentToast('Asistente creado!');
      // this.storage.set('asistente', this.asistente);
      // this.navCtrl.navigateRoot('/vasistente', {animated: true});
      this.navCtrl.navigateRoot('/asistentes', {animated: true});
    } else {
      this.uiService.alertaInformativa('Código ya existe en la BD!');
    }
  }

  async cargarPost() {
    this.post = await this.storage.get('post');
  }

  capitalize(value: string) {
    return value.replace(/(?:^|\s)\S/g, l => l.toUpperCase());
  }

  getCodigo() {
    this.asistenteService.getCodigo().subscribe(
      response => {
        this.asistente.codigo = response['code'];
      }
    );
  }

}
