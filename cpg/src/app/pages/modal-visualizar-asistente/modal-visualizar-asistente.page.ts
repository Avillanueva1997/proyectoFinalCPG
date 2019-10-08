import { Component, OnInit, Input } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@Component({
  selector: 'app-modal-visualizar-asistente',
  templateUrl: './modal-visualizar-asistente.page.html',
  styleUrls: ['./modal-visualizar-asistente.page.scss'],
})
export class ModalVisualizarAsistentePage implements OnInit {

  @Input() asistente: any;

  pdfObj = null;

  constructor(private modalCtrl: ModalController, private plt: Platform, private file: File, private fileOpener: FileOpener) { }

  ngOnInit() {
    console.log(this.asistente);
  }

  salirConArgumentos() {
    this.modalCtrl.dismiss({
      ok: true,
    });
  }

  onGeneratePdf(){
    const docDefinition = {
      pageSize: {width: 359.05511811, height: 245.66929134},
      pageOrientation: 'landscape',
      content: [
        { text: this.asistente.name, style: 'subheader', alignment: 'center',
        absolutePosition: {x: -50, y: 40}},
        { text: this.asistente.appaterno, style: 'subheader', alignment: 'center',
        absolutePosition: {x: -50, y: 100}},
        { text: this.asistente.empresa, style: 'subheader', alignment: 'center',
        absolutePosition: {x: -50, y: 160}},
        /*{ text: 'From', style: 'subheader' },*/
        /*{ text: 'Prueba' },
        { text: 'To', style: 'subheader' },
        'Prueba',*/

        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
 
        { qr: this.asistente.codigo, fit: 120,
          absolutePosition: {x: 230, y: 30}
        }
      ],
      styles: {
        subheader: {
          fontSize: 25,
          bold: true
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
    this.downloadPdf();
  }

  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        const blob = new Blob([buffer], { type: 'application/pdf' });

        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'credencial.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'credencial.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }

}
