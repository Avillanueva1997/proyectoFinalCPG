import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Usuario } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements  AfterViewInit {

  @ViewChild('slidePrincipal', {static: false}) slides: IonSlides;

  loginUser = {
    email: 'villanuevaangel68@gmail.com',
    password: '12345'
  };

  registerUser: Usuario = {
    email: 'test@test.com',
    password: '12345',
    nombre: 'Test',
    avatar: 'av-1.png'
  };

  token: string = null;

  constructor(private userService: UsuarioService, private navCtrl: NavController, private uiService: UiServiceService) {
  }

  ngAfterViewInit() {
    this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm) {
    if (fLogin.invalid) {
      return;
    }
    const valido = await this.userService.login(this.loginUser.email, this.loginUser.password);

    if (valido) {
      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
    } else {
      this.uiService.alertaInformativa('Datos incorrectos!');
    }
  }

  async register(fRegister: NgForm) {
    if (fRegister.invalid) {
      return;
    }
    const valido = await this.userService.registro(this.registerUser);

    if (valido) {
      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
    } else {
      this.uiService.alertaInformativa('El correo electrónico ya existe');
    }
  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }


}
