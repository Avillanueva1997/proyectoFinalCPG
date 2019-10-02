import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { PostsService } from '../../services/posts.service';
import { MenuController, NavController } from '@ionic/angular';
import { Componente } from 'src/app/interfaces/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  componentes: Observable<Componente[]>;


  constructor( private menuCtrl: MenuController,
               private dashBoardService: DashboardService,
               private navCtrl: NavController,
               private postService: PostsService ) { }

  ngOnInit() {
    this.componentes = this.dashBoardService.getMenuOpts();
  }

  /*redirect(vista: string){
    this.navCtrl.navigateRoot('/main/tabs' + vista, {animated: true});
  }*/

  toggleMenu() {
    this.menuCtrl.toggle();
  }

  onRoot() {
    this.postService.paginaPosts = 0;
    this.navCtrl.navigateRoot('/', {animated: true});
  }
}
