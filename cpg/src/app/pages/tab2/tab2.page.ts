import { Component, OnInit, ElementRef } from '@angular/core';
import { Post } from '../../interfaces/interfaces';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Platform } from '@ionic/angular';
import { UiServiceService } from '../../services/ui-service.service';

declare var window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  tempImages: string[] = [];

  cellphone: boolean;

  post = {
    mensaje: '',
    coords: null,
    position: false
  };

  cargandoGeo = false;

  cant = 0;

  constructor(private postService: PostsService,
              private router: Router,
              private geolocation: Geolocation,
              private camera: Camera,
              private platform: Platform,
              private uiService: UiServiceService,
              private el: ElementRef) {}


  ngOnInit() {
    if (this.platform.is('cordova')) {
      this.cellphone = true;
    } else {
      this.cellphone = false;
    }
  }

  async crearPost() {

    if (!this.cellphone && this.cant === 0) {
      this.uiService.alertaInformativa('Suba la imagen del evento!');
    } else {
      const creado = await this.postService.createPost( this.post);

      this.post = {
        mensaje: '',
        coords: null,
        position: false
      };

      this.tempImages = [];

      this.router.navigateByUrl('/main/tabs/tab1');
    }
  }

  getGeo() {
    if (!this.post.position) {
      this.post.coords = null;
    }

    this.cargandoGeo = true;

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.cargandoGeo = false;
      const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
      this.post.coords = coords;
     }).catch((error) => {
      this.cargandoGeo = false;
     });
  }

  camara() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.procesarImagen(options);
  }

  libreria() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.procesarImagen(options);
  }

  procesarImagen(options: CameraOptions) {
    this.camera.getPicture(options).then((imageData) => {
      const img = window.Ionic.WebView.convertFileSrc(imageData);
      this.postService.subirImagen(imageData);
      this.tempImages.push(img);
     }, (err) => {
      // Handle error
     });
  }

  async getFile() {
    const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#file');
    const files = inputEl.files;
    this.cant = files.length;
    if(this.cant !== 0){
      const response: any = await this.postService.uploadFile(files);
      if(response === true){
        this.uiService.alertaInformativa('La imagen se subio correctamente!');
      } else {
        this.uiService.alertaInformativa(response);
      }
    } else {
      this.uiService.alertaInformativa('Suba la imagen del evento!');
    }
  }

}

