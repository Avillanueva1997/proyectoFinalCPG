import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-vasistente',
  templateUrl: './vasistente.page.html',
  styleUrls: ['./vasistente.page.scss'],
})
export class VasistentePage implements OnInit {

  asistente: any;
  titulo = 'Visualizar Asistente';
  codigo: any;

  qrData = null;
  createdCode = null;

  constructor(private storage: Storage, private screenshot: Screenshot, private uiService: UiServiceService) { }

  ngOnInit() {
    this.cargarAsistente();
  }

  async cargarAsistente() {
    this.asistente = await this.storage.get('asistente');
    const dni = this.asistente.dni;
    this.codigo = this.asistente.codigo;
    this.createdCode = dni.toString();
  }

  takeScreenShoot() {
    const codigo = this.codigo.toString();
    this.screenshot.save('jpg', 80, codigo).then(
      response => {
        if (response.filePath !== '') {
          this.uiService.presentToast('Captura guardada en su galería!');
        }
      }
    );
  }

}
