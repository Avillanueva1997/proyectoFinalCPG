import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-visualizar-asistente',
  templateUrl: './modal-visualizar-asistente.page.html',
  styleUrls: ['./modal-visualizar-asistente.page.scss'],
})
export class ModalVisualizarAsistentePage implements OnInit {

  @Input() asistente: any;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.asistente);
  }

  salirConArgumentos() {
    this.modalCtrl.dismiss({
      ok: true,
    });
  }

}
