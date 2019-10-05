import { Component, OnInit } from '@angular/core';
import { AsistenteService } from '../../services/asistente.service';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.page.html',
  styleUrls: ['./indicadores.page.scss'],
})
export class IndicadoresPage implements OnInit {

  title = 'Indicadores';

  constructor(private asistenteService: AsistenteService) { }

  ngOnInit() {
  }

}
