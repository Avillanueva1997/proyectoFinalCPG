import { Component, OnInit, ElementRef } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AsistenteService } from '../../services/asistente.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/storage';
import { UiServiceService } from '../../services/ui-service.service';

const URL = environment.url;

@Component({
  selector: 'app-masistentes',
  templateUrl: './masistentes.page.html',
  styleUrls: ['./masistentes.page.scss'],
})
export class MasistentesPage implements OnInit {

  titulo = 'Carga masiva';
  post: any;

  constructor(private el: ElementRef,
              private asistenteService: AsistenteService,
              private storage: Storage,
              private uiService: UiServiceService) { }

  ngOnInit() {
    this.cargarPost();
  }

  async getFile() {
    const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#file');
    const files = inputEl.files;
    const response = await this.asistenteService.uploadFile(files, this.post);
    if(response === false){
      this.uiService.alertaInformativa('Error al importar el excel');
    } else {
      this.uiService.alertaInformativa('Se importaron ' + response + ' asistentes.');
    }
  }

  async cargarPost() {
    this.post = await this.storage.get('post');
  }

}
