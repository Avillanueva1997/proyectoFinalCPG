import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { environment } from 'src/environments/environment';
import { Asistente } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class AsistenteService {

  constructor(private http: HttpClient,
              private userService: UsuarioService) { }

  nuevoAsistente = new EventEmitter<Asistente>();

  createAsistente(asistente) {
    const headers = new HttpHeaders({
      'x-token': this.userService.token
    });

    return new Promise(resolve => {
      this.http.post(`${URL}/asistente`, asistente, {headers}).subscribe(
        response => {
          if(response['ok']) {
            this.nuevoAsistente.emit(response['asistente']);
            resolve(true);
          } else {
            resolve(false);
          }
        }
      );
    });
  }

  getAsistentes(postid: string) {
    return this.http.get(`${URL}/asistente/?postid=${postid}`);
  }

  getAsistentesBySearch(postid: string, value: string) {
    return this.http.get(`${URL}/asistente/search/${postid}/${value}`);
  }

  evaluateCodeQr(postid: string, codigo: string){
    return this.http.get(`${URL}/asistente/evaluate/${postid}/${codigo}`);
  }

  uploadFile(files: any, postid: string) {
    const headers = new HttpHeaders({
      'x-token': this.userService.token
    });
    const fileCount: number = files.length;
    const formData = new FormData();
    if (fileCount > 0) {
      formData.append('file', files.item(0));
      return new Promise(resolve => {
        this.http.post(`${URL}/asistente/upload/${postid}`, formData, {headers}).subscribe(
          response => {
             if(response['ok']) {
              resolve(response['cant']);
            } else {
              resolve(false);
            }
          });
      });
    }
  }

  updateAsistente(params: any) {
    const headers = new HttpHeaders({
      'x-token': this.userService.token
    });

    return new Promise(resolve => {
      this.http.post(`${URL}/asistente/updateasistencia`, params, {headers}).subscribe(
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

  updateAsistenteComplete(asistente: any) {
    const headers = new HttpHeaders({
      'x-token': this.userService.token
    });

    return new Promise(resolve => {
      this.http.post(`${URL}/asistente/update`, asistente, {headers}).subscribe(
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

  getIndicadoresOne(postid: string){
    return this.http.get(`${URL}/asistente/indicadorOne/${postid}`);
  }

  getIndicadoresTwo(postid: string){
    return this.http.get(`${URL}/asistente/indicadorTwo/${postid}`);
  }

  getIndicadoresThree(postid: string){
    return this.http.get(`${URL}/asistente/indicadorThree/${postid}`);
  }

  getCodigo(){
    return this.http.get(`${URL}/asistente/codigo`);
  }
}
