import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Componente } from 'src/app/interfaces/interfaces';
import { Observable } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  componentes: Observable<Componente[]>;


  constructor( private menuCtrl: MenuController,
               private dashBoardService: DashboardService,
               private navCtrl: NavController ) { }

  ngOnInit() {
    this.componentes = this.dashBoardService.getMenuOpts();
  }

  /*redirect(vista: string){
    this.navCtrl.navigateRoot('/main/tabs' + vista, {animated: true});
  }*/

  toggleMenu() {
    this.menuCtrl.toggle();
  }
}
