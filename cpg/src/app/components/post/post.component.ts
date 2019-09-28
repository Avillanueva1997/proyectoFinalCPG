import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  @Input() post: Post = {};

  constructor(private navCtrl: NavController) { }

  ngOnInit() {}


  clickEvent(event: any) {
    this.navCtrl.navigateRoot('/event', {animated: true});
  }

}
