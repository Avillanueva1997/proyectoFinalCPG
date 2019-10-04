import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { UiServiceService } from '../../services/ui-service.service';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

import pdfMake from 'pdfmake/build/pdfMake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs =  pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-vasistente',
  templateUrl: './vasistente.page.html',
  styleUrls: ['./vasistente.page.scss'],
})
export class VasistentePage implements OnInit {

  asistente: any;
  titulo = 'Datos del Asistente';
  codigo: any;

  qrData = null;
  showCard = false;

  pdfObj = null;

  constructor(private storage: Storage,
              private screenshot: Screenshot,
              private uiService: UiServiceService,
              private plt: Platform,
              //private file: File,
              //private fileOpener: FileOpener
              ) {
              }

  ngOnInit() {
    this.encodedText();
  }

  async encodedText() {
    this.asistente = await this.storage.get('asistente');
    this.showCard = true;
    const codigo = this.asistente.codigo;
    this.qrData = codigo;
    // console.log(this.qrData);
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


  createPdf() {
    const docDefinition = {
      content: [
        { text: 'Nombre', style: 'header' },
        { text: this.asistente.name, alignment: 'right' },

        { text: 'Empresa', style: 'subheader' },
        { text: this.asistente.empresa },

        { text: 'Cargo', style: 'subheader' },
        this.asistente.cargo,

        { text: this.asistente.pais, style: 'story', margin: [0, 20, 0, 20] },

        {
          ul: [
            'Bacon',
            'Rips',
            'BBQ',
          ]
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }

    };

    this.pdfObj = pdfMake.createPdf(docDefinition);
  }

  downloadPdf() {
    if ( this.plt.is('cordova')) {
    } else {
      this.pdfObj.download();
    }
  }

}
