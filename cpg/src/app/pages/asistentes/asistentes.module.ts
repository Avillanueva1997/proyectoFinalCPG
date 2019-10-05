import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AsistentesPage } from './asistentes.page';
import { ModalEditAsistentePage } from '../modal-edit-asistente/modal-edit-asistente.page';
import { ModalEditAsistentePageModule } from '../modal-edit-asistente/modal-edit-asistente.module';
import { ModalVisualizarAsistentePage } from '../modal-visualizar-asistente/modal-visualizar-asistente.page';
import { ModalVisualizarAsistentePageModule } from '../modal-visualizar-asistente/modal-visualizar-asistente.module';

const routes: Routes = [
  {
    path: '',
    component: AsistentesPage
  }
];

@NgModule({
  entryComponents: [
    ModalEditAsistentePage,
    ModalVisualizarAsistentePage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalEditAsistentePageModule,
    ModalVisualizarAsistentePageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AsistentesPage]
})
export class AsistentesPageModule {}
