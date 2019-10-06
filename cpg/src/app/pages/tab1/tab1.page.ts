import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from '../../interfaces/interfaces';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts: Post[] = [];

  habilitado = true;

  constructor(private postService: PostsService, private storage: Storage) {}

  ngOnInit() {
    this.siguientes();
    this.postService.nuevoPost.subscribe( post => {
      this.posts.unshift(post);
    });

    console.log(this.posts);

    /*if (this.storage.get('post')) {
      this.storage.remove('post');
    }*/
  }

  recargar(event: any) {
    this.siguientes(event, true);
    this.habilitado = true;
    this.posts = [];
  }

  siguientes(event?: any, pull: boolean = false) {
    this.postService.getPosts(pull).subscribe(
      response => {
        this.posts.push(...response.posts);
        if ( event ) {
          event.target.complete();
          if ( response.posts.length === 0) {
            this.habilitado = false;
          }
        }
      });
  }
}
