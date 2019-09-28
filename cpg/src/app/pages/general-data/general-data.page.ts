import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.page.html',
  styleUrls: ['./general-data.page.scss'],
})
export class GeneralDataPage implements OnInit {

  titulo = 'Datos Generales';

  constructor() { }

  ngOnInit() {
  }

}
