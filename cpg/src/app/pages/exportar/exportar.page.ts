import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-exportar',
  templateUrl: './exportar.page.html',
  styleUrls: ['./exportar.page.scss'],
})
export class ExportarPage implements OnInit {

  post: any;

  constructor(private postService: PostsService, private storage: Storage) { }

  ngOnInit() {
    this.cargarPost();
  }

  downloadExcel(event: any) {
    this.postService.getDataExcel(this.post).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  async cargarPost() {
    this.post = await this.storage.get('post');
  }

}
