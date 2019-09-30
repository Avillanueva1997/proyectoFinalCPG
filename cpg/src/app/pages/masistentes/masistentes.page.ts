import { Component, OnInit } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-masistentes',
  templateUrl: './masistentes.page.html',
  styleUrls: ['./masistentes.page.scss'],
})
export class MasistentesPage implements OnInit {

  titulo = 'Registrar Masivo';

  constructor(private camera: Camera) { }

  ngOnInit() {
  }

  onUpload(){
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.procesarFile(options);
  }

  procesarFile(options: CameraOptions) {
    this.camera.getPicture(options).then((imageData) => {
      // const img = window.Ionic.WebView.convertFileSrc(imageData);
      // this.postService.subirImagen(imageData);
      // this.tempImages.push(img);
     }, (err) => {
      // Handle error
     });
  }

}
