import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AsistenteService } from '../../services/asistente.service';
import { TouchSequence } from 'selenium-webdriver';
import { Asistente } from '../../interfaces/interfaces';

@Component({
  selector: 'app-asistentes',
  templateUrl: './asistentes.page.html',
  styleUrls: ['./asistentes.page.scss'],
})
export class AsistentesPage implements OnInit {

  titulo = 'Asistentes';
  post: any;
  asistentes: Asistente[] = [];

  constructor(private storage: Storage, private asistenteService: AsistenteService) {
  }

  ngOnInit() {
    this.cargarPost();
  }

  async cargarPost() {
    this.post = await this.storage.get('post');
    this.cargarAsistentes(this.post);
  }

  cargarAsistentes(post, event?: any) {
    this.asistenteService.getAsistentes(post).subscribe(
      response => {
        if(response['ok']){
          this.asistentes = response['asistentes'];
          if (event) {
            event.target.complete();
          }
        }
      }
    );
  }

  recargar(event: any) {
    this.cargarAsistentes(this.post, event);
  }

}
