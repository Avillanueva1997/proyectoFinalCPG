import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Storage } from '@ionic/storage';
import { UiServiceService } from '../../services/ui-service.service';
import { SalaService } from '../../services/sala.service';
import { AsistenteService } from '../../services/asistente.service';

@Component({
  selector: 'app-scansala',
  templateUrl: './scansala.page.html',
  styleUrls: ['./scansala.page.scss'],
})
export class ScansalaPage implements OnInit {

  slideOptions = {
    allowSlidePrev: false,
    allowSlideNext: false,
  };

  codeQr: string;
  post: any;
  sala: any;
  asistente: any = {};

  constructor(private barCodeScanner: BarcodeScanner,
              private storage: Storage,
              private asistenteService: AsistenteService,
              private salaService: SalaService,
              private uiService: UiServiceService) { }

  ngOnInit() {
    this.scan();
    this.cargarPost();
    this.cargarSala();
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

  async cargarSala() {
    this.sala = await this.storage.get('sala');
  }

   verificarCode() {
    this.asistenteService.evaluateCodeQr(this.post, this.codeQr).subscribe(
      async response => {
        if(response['ok']){
          this.asistente = response['asistente'];
          const value =  await this.salaService.createSalaAsistente(this.sala, this.asistente._id, this.post);

          if (value) {
            const message = this.asistente.name
                          + ' ' + this.asistente.appaterno
                          + ' se registro a esta sala!';
            this.uiService.alertaInformativa(message);
          } else {
            const message = 'Este asistente ya se encuentra registrado a esta sala!';
            this.uiService.alertaInformativa(message);
          }
        } else {
          const message = response['mensaje'];
          this.uiService.alertaInformativa(message);
        }
      }
    );
  }
}
