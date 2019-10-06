import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  @Input() post: Post = {};

  constructor(private navCtrl: NavController, private storage: Storage) { }

  ngOnInit() {}


  clickEvent(post: any) {
    this.navCtrl.navigateRoot('/event', {animated: true});
    console.log('post');
    console.log(post);
    this.storage.set('post', post._id);
  }

}
