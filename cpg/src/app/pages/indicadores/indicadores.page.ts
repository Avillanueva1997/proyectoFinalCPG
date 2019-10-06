import { Component, OnInit } from '@angular/core';
import { AsistenteService } from '../../services/asistente.service';
import { Storage } from '@ionic/storage';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.page.html',
  styleUrls: ['./indicadores.page.scss'],
})
export class IndicadoresPage implements OnInit {

  title = 'Indicadores';
  post: string;

  cantIndividual = 0;
  cantMasivo = 0;
  cantInvitadosOn = 0;
  sum = 0;

  constructor(private asistenteService: AsistenteService,
              private storage: Storage,
              private uiService: UiServiceService) { }

  ngOnInit() {
    this.cargarPost();
  }

  async cargarPost() {
    this.post = await this.storage.get('post');
    this.getIndicadoresOne();
    this.getIndicadoresTwo();
    this.getIndicadoresThree();
  }


  getIndicadoresOne() {
    this.asistenteService.getIndicadoresOne(this.post).subscribe(
      response => {
        if(response['ok']){
          this.cantIndividual = response['cargaindividual'];
        } else {
          this.cantIndividual = 0;
        }
      }
    );
  }

  getIndicadoresTwo() {
    this.asistenteService.getIndicadoresTwo(this.post).subscribe(
      response => {
        if(response['ok']){
          this.cantMasivo = response['cargamasiva'];
        } else {
          this.cantMasivo = 0;
        }
      }
    );
  }

  getIndicadoresThree() {
    this.asistenteService.getIndicadoresThree(this.post).subscribe(
      response => {
        if(response['ok']){
          this.cantInvitadosOn = response['invitadoson'];
        } else {
          this.cantInvitadosOn = 0;
        }
        this.sum = Number(this.cantInvitadosOn) + Number(this.cantIndividual);
      }
    );
  }

}
