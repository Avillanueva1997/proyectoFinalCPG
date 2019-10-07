import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { UiServiceService } from '../../services/ui-service.service';
import { Platform } from '@ionic/angular';

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
              private plt: Platform
              ) {
              }

  ngOnInit() {
  }
}
