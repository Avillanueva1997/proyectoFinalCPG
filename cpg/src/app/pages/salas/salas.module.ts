import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SalasPage } from './salas.page';
import { ModalEditSalaPageModule } from '../modal-edit-sala/modal-edit-sala.module';
import { ModalEditSalaPage } from '../modal-edit-sala/modal-edit-sala.page';

const routes: Routes = [
  {
    path: '',
    component: SalasPage
  }
];

@NgModule({
  entryComponents: [
    ModalEditSalaPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalEditSalaPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SalasPage]
})
export class SalasPageModule {}
