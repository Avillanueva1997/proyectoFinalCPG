import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Storage } from '@ionic/storage';
import { AsistenteService } from '../../services/asistente.service';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-scancodigo',
  templateUrl: './scancodigo.page.html',
  styleUrls: ['./scancodigo.page.scss'],
})
export class ScancodigoPage implements OnInit {

  slideOptions = {
    allowSlidePrev: false,
    allowSlideNext: false,
  };

  codeQr: string;
  post: any;
  asistente: any = {};

  constructor(private barCodeScanner: BarcodeScanner,
              private storage: Storage,
              private asistenteService: AsistenteService,
              private uiService: UiServiceService) { }

  ngOnInit() {
    this.scan();
    this.cargarPost();
  }

  scan() {
    this.barCodeScanner.scan().then(barcodeData => {
      console.log(barcodeData);
      if (barcodeData.text !== '') {
        this.codeQr = barcodeData.text;
        this.verificarCode();
      }
     }).catch(err => {
         console.log('Error', err);
     });
  }

  async cargarPost() {
    this.post = await this.storage.get('post');
  }

  verificarCode() {
    this.asistenteService.evaluateCodeQr(this.post, this.codeQr).subscribe(
      response => {
        if(response['ok']){
          this.asistente = response['asistente'];
          const message = this.asistente.name 
                          + ' ' + this.asistente.appaterno
                          + ' ' + this.asistente.apmaterno
                          + ' se encuentra registrado!';
          this.uiService.alertaInformativa(message);
        } else {
          const message = response['mensaje'];
          this.uiService.alertaInformativa(message);
        }
      }
    );
  }

}
