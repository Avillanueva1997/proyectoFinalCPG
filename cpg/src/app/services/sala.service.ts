import { Injectable, EventEmitter } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Sala } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  constructor(private userService: UsuarioService,
              private http: HttpClient) { }

  nuevaSala = new EventEmitter<Sala>();

  createSala(sala) {
    const headers = new HttpHeaders({
      'x-token': this.userService.token
    });

    return new Promise(resolve => {
      this.http.post(`${URL}/sala`, sala, {headers}).subscribe(
        response => {
          if(response['ok']) {
            this.nuevaSala.emit(response['sala']);
            resolve(true);
          } else {
            resolve(false);
          }
        }
      );
    });
  }

  getSalas(postid: string) {
    return this.http.get(`${URL}/sala/?postid=${postid}`);
  }

}
