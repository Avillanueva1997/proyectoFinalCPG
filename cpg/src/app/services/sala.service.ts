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

  updateSalaComplete(sala: any) {
    const headers = new HttpHeaders({
      'x-token': this.userService.token
    });

    return new Promise(resolve => {
      this.http.post(`${URL}/sala/update`, sala, {headers}).subscribe(
        response => {
          if(response['ok']) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      );
    });
  }

  deleteSala(codigo: any) {
    return this.http.get(`${URL}/sala/delete/${codigo}`);
  }

  createSalaAsistente(sala: string, asistente: string, post: string) {

    const parametros = {
      sala,
      asistente,
      post
    };

    const headers = new HttpHeaders({
      'x-token': this.userService.token
    });

    return new Promise(resolve => {
      this.http.post(`${URL}/sala/savesa`, parametros, {headers}).subscribe(
        response => {
          if(response['ok']) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      );
    });
  }

  getSalaAsistentes(post: string, sala: string) {
    return this.http.get(`${URL}/sala/tablesa/${post}/${sala}`);
  }

}
