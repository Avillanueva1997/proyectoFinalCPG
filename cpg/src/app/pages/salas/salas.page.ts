import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SalaService } from '../../services/sala.service';
import { Sala } from 'src/app/interfaces/interfaces';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-salas',
  templateUrl: './salas.page.html',
  styleUrls: ['./salas.page.scss'],
})
export class SalasPage implements OnInit {

  post: any;

  titulo = 'Salas';

  salas: Sala[] = [];

  constructor(private storage: Storage, private salaService: SalaService) { }

  ngOnInit() {
    this.cargarPost();
  }

  async cargarPost() {
    this.post = await this.storage.get('post');
    this.cargarSalas(this.post);
  }

  cargarSalas(post, event?: any) {
    this.salaService.getSalas(post).subscribe(
      response => {
        if(response['ok']){
          this.salas = response['salas'];
          if (event) {
            event.target.complete();
          }
        }
      }
    );
  }

  recargar(event: any) {
    this.cargarSalas(this.post, event);
  }

}
