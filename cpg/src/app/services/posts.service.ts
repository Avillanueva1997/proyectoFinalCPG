import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaPosts, Post } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPosts = 0;

  nuevoPost = new EventEmitter<Post>();

  constructor(private http: HttpClient, private userService: UsuarioService, private fileTransfer: FileTransfer) { }

  getPosts(pull: boolean = false) {

    if (pull) {
      this.paginaPosts = 0;
    }
    this.paginaPosts++;
    return this.http.get<RespuestaPosts>(`${URL}/posts/?pagina=${this.paginaPosts}`);
  }

  createPost(post) {
    const headers = new HttpHeaders({
      'x-token': this.userService.token
    });

    return new Promise(resolve => {
      this.http.post(`${URL}/posts`, post, {headers}).subscribe(
        response => {
          if(response['ok']) {
            this.nuevoPost.emit(response['post']);
            resolve(true);
          }
        }
      );
    });
  }

  subirImagen(img: string) {
    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: {
        'x-token': this.userService.token
      }
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    fileTransfer.upload(img, `${URL}/posts/upload`, options)
    .then(data => {
      console.log(data);
    }).catch( err => {
      console.log('Error en carga del file', err);
    });
  }
}
