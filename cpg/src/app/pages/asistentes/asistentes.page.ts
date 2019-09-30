import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asistentes',
  templateUrl: './asistentes.page.html',
  styleUrls: ['./asistentes.page.scss'],
})
export class AsistentesPage implements OnInit {

  ctrl: any;
  titulo = 'Asistentes';

  constructor() {
    this.ctrl = [
      {
        name: "AiA",
        code: "AI101",
        limit: 25000,
        account: "Life Insurance"
      },
      {
        name: "Cargills",
        code: "CF001",
        limit: 30000,
        account: "Food City"
      }
    ];
  }

  ngOnInit() {
  }

}
