import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private userService: UsuarioService, private http: HttpClient) { }

  nuevoEvent = new EventEmitter<Event>();

  createEvent(event) {
    const headers = new HttpHeaders({
      'x-token': this.userService.token
    });

    return new Promise(resolve => {
      this.http.post(`${URL}/event`, event, {headers}).subscribe(
        response => {
          if(response['ok']) {
            this.nuevoEvent.emit(response['event']);
            resolve(true);
          } else {
            resolve(false);
          }
        }
      );
    });
  }
}
