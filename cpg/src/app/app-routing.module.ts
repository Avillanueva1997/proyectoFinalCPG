import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [ UsuarioGuard ]
    // canActivate:[ UsuarioGuard ]
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main/tabs/tab1'
  },
  { path: 'event', loadChildren: './pages/tab4/tab4.module#Tab4PageModule' },
  { path: 'general-data', loadChildren: './pages/general-data/general-data.module#GeneralDataPageModule' },
  { path: 'asistentes', loadChildren: './pages/asistentes/asistentes.module#AsistentesPageModule' },
  { path: 'nasistente', loadChildren: './pages/nasistente/nasistente.module#NasistentePageModule' },
  { path: 'salas', loadChildren: './pages/salas/salas.module#SalasPageModule' },
  { path: 'masistentes', loadChildren: './pages/masistentes/masistentes.module#MasistentesPageModule' },
  { path: 'scancodigo', loadChildren: './pages/scancodigo/scancodigo.module#ScancodigoPageModule' },
  { path: 'nsala', loadChildren: './pages/nsala/nsala.module#NsalaPageModule' },
  { path: 'vasistente', loadChildren: './pages/vasistente/vasistente.module#VasistentePageModule' },
  { path: 'vsala', loadChildren: './pages/vsala/vsala.module#VsalaPageModule' },
  { path: 'scansala', loadChildren: './pages/scansala/scansala.module#ScansalaPageModule' },
  { path: 'indicadores', loadChildren: './pages/indicadores/indicadores.module#IndicadoresPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
