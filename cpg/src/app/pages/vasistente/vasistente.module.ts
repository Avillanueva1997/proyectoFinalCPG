import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VasistentePage } from './vasistente.page';

import { NgxQRCodeModule } from 'ngx-qrcode2';

const routes: Routes = [
  {
    path: '',
    component: VasistentePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxQRCodeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VasistentePage]
})
export class VasistentePageModule {}
