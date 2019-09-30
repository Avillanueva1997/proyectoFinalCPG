import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

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

  constructor(private barCodeScanner: BarcodeScanner) { }

  ngOnInit() {
    this.scan();
  }

  scan() {
    this.barCodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });
  }

}
