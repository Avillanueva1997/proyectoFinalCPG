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

  // One

  getAsistentesByName(postid: string, value: string) {
    return this.http.get(`${URL}/asistente/search01/${postid}/${value}`);
  }

  getAsistentesByAppaterno(postid: string, value: string) {
    return this.http.get(`${URL}/asistente/search17/${postid}/${value}`);
  }

  getAsistentesByApmaterno(postid: string, value: string) {
    return this.http.get(`${URL}/asistente/search18/${postid}/${value}`);
  }

  getAsistentesByEmpresa(postid: string, value: string) {
    return this.http.get(`${URL}/asistente/search19/${postid}/${value}`);
  }

  getAsistentesByTipoinvitado(postid: string, value: string) {
    return this.http.get(`${URL}/asistente/search20/${postid}/${value}`);
  }

  // Two

  getAsistentesByNameAppaterno(postid: string, valueOne: string, valueTwo: string) {
    return this.http.get(`${URL}/asistente/search02/${postid}/${valueOne}/${valueTwo}`);
  }

  getAsistentesByNameApmaterno(postid: string, valueOne: string, valueTwo: string) {
    return this.http.get(`${URL}/asistente/search03/${postid}/${valueOne}/${valueTwo}`);
  }

  getAsistentesByNameEmpresa(postid: string, valueOne: string, valueTwo: string) {
    return this.http.get(`${URL}/asistente/search04/${postid}/${valueOne}/${valueTwo}`);
  }

  getAsistentesByNameTipoinvitado(postid: string, valueOne: string, valueTwo: string) {
    return this.http.get(`${URL}/asistente/search05/${postid}/${valueOne}/${valueTwo}`);
  }

  getAsistentesByAppaternoApmaterno(postid: string, valueOne: string, valueTwo: string) {
    return this.http.get(`${URL}/asistente/search21/${postid}/${valueOne}/${valueTwo}`);
  }

  getAsistentesByAppaternoEmpresa(postid: string, valueOne: string, valueTwo: string) {
    return this.http.get(`${URL}/asistente/search22/${postid}/${valueOne}/${valueTwo}`);
  }

  getAsistentesByAppaternoTipoinvitado(postid: string, valueOne: string, valueTwo: string) {
    return this.http.get(`${URL}/asistente/search23/${postid}/${valueOne}/${valueTwo}`);
  }

  getAsistentesByApmaternoEmpresa(postid: string, valueOne: string, valueTwo: string) {
    return this.http.get(`${URL}/asistente/search28/${postid}/${valueOne}/${valueTwo}`);
  }

  getAsistentesByApmaternoTipoinvitado(postid: string, valueOne: string, valueTwo: string) {
    return this.http.get(`${URL}/asistente/search29/${postid}/${valueOne}/${valueTwo}`);
  }

  getAsistentesByEmpresaTipoinvitado(postid: string, valueOne: string, valueTwo: string) {
    return this.http.get(`${URL}/asistente/search31/${postid}/${valueOne}/${valueTwo}`);
  }

  // three

  getAsistentesByNameAppaternoApmaterno(postid: string, valueOne: string, valueTwo: string, valueThree: string) {
    return this.http.get(`${URL}/asistente/search06/${postid}/${valueOne}/${valueTwo}/${valueThree}`);
  }

  getAsistentesByNameAppaternoEmpresa(postid: string, valueOne: string, valueTwo: string, valueThree: string) {
    return this.http.get(`${URL}/asistente/search07/${postid}/${valueOne}/${valueTwo}/${valueThree}`);
  }

  getAsistentesByNameAppaternoTipoinvitado(postid: string, valueOne: string, valueTwo: string, valueThree: string) {
    return this.http.get(`${URL}/asistente/search08/${postid}/${valueOne}/${valueTwo}/${valueThree}`);
  }

  getAsistentesByNameApmaternoEmpresa(postid: string, valueOne: string, valueTwo: string, valueThree: string) {
    return this.http.get(`${URL}/asistente/search09/${postid}/${valueOne}/${valueTwo}/${valueThree}`);
  }

  getAsistentesByNameApmaternoTipoinvitado(postid: string, valueOne: string, valueTwo: string, valueThree: string) {
    return this.http.get(`${URL}/asistente/search10/${postid}/${valueOne}/${valueTwo}/${valueThree}`);
  }

  getAsistentesByNameEmpresaTipoinvitado(postid: string, valueOne: string, valueTwo: string, valueThree: string) {
    return this.http.get(`${URL}/asistente/search11/${postid}/${valueOne}/${valueTwo}/${valueThree}`);
  }

  getAsistentesByAppaternoApmaternoEmpresa(postid: string, valueOne: string, valueTwo: string, valueThree: string) {
    return this.http.get(`${URL}/asistente/search24/${postid}/${valueOne}/${valueTwo}/${valueThree}`);
  }

  getAsistentesByAppaternoApmaternoTipoinvitado(postid: string, valueOne: string, valueTwo: string, valueThree: string) {
    return this.http.get(`${URL}/asistente/search25/${postid}/${valueOne}/${valueTwo}/${valueThree}`);
  }

  getAsistentesByAppaternoEmpresaTipoinvitado(postid: string, valueOne: string, valueTwo: string, valueThree: string) {
    return this.http.get(`${URL}/asistente/search26/${postid}/${valueOne}/${valueTwo}/${valueThree}`);
  }

  getAsistentesByApmaternoEmpresaTipoinvitado(postid: string, valueOne: string, valueTwo: string, valueThree: string) {
    return this.http.get(`${URL}/asistente/search30/${postid}/${valueOne}/${valueTwo}/${valueThree}`);
  }

  // four

  getAsistentesByNameAppaternoApmaternoEmpresa(postid: string, valueOne: string, valueTwo: string, valueThree: string, valueFour: string) {
    return this.http.get(`${URL}/asistente/search12/${postid}/${valueOne}/${valueTwo}/${valueThree}/${valueFour}`);
  }

  // tslint:disable-next-line: max-line-length
  getAsistentesByNameAppaternoApmaternoTipoinvitado(postid: string, valueOne: string, valueTwo: string, valueThree: string, valueFour: string) {
    return this.http.get(`${URL}/asistente/search13/${postid}/${valueOne}/${valueTwo}/${valueThree}/${valueFour}`);
  }

  // tslint:disable-next-line: max-line-length
  getAsistentesByNameAppaternoEmpresaTipoinvitado(postid: string, valueOne: string, valueTwo: string, valueThree: string, valueFour: string) {
    return this.http.get(`${URL}/asistente/search14/${postid}/${valueOne}/${valueTwo}/${valueThree}/${valueFour}`);
  }

  // tslint:disable-next-line: max-line-length
  getAsistentesByNameApmaternoEmpresaTipoinvitado(postid: string, valueOne: string, valueTwo: string, valueThree: string, valueFour: string) {
    return this.http.get(`${URL}/asistente/search15/${postid}/${valueOne}/${valueTwo}/${valueThree}/${valueFour}`);
  }

  getAsistentesByAppaternoApmaternoEmpresaTipoinvitado(postid: string, valueOne: string, valueTwo: string, valueThree: string, valueFour: string) {
    return this.http.get(`${URL}/asistente/search27/${postid}/${valueOne}/${valueTwo}/${valueThree}/${valueFour}`);
  }

  // five

  // tslint:disable-next-line: max-line-length
  getAsistentesByNameAppaternoApmaternoEmpresaTipoinvitado(postid: string, valueOne: string, valueTwo: string, valueThree: string, valueFour: string, valueFive: string) {
    return this.http.get(`${URL}/asistente/search16/${postid}/${valueOne}/${valueTwo}/${valueThree}/${valueFour}/${valueFive}`);
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

  getIndicadoresOne(postid: string) {
    return this.http.get(`${URL}/asistente/indicadorOne/${postid}`);
  }

  getIndicadoresTwo(postid: string) {
    return this.http.get(`${URL}/asistente/indicadorTwo/${postid}`);
  }

  getIndicadoresThree(postid: string) {
    return this.http.get(`${URL}/asistente/indicadorThree/${postid}`);
  }

  getCodigo(nombre: string) {
    return this.http.get(`${URL}/asistente/codigo/${nombre}`);
  }

  deleteAsistente(codigo: any) {
    return this.http.get(`${URL}/asistente/delete/${codigo}`);
  }
}
