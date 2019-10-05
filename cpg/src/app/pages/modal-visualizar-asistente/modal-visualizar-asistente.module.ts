import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalVisualizarAsistentePage } from './modal-visualizar-asistente.page';

import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxQRCodeModule
  ],
  declarations: [ModalVisualizarAsistentePage]
})
export class ModalVisualizarAsistentePageModule {}
