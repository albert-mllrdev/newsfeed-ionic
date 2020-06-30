import { Component, OnInit } from '@angular/core';
import { IPost } from '@interfaces/IPost';
import { PostDataService } from '@data/post.data.service';
import { ModalController } from '@ionic/angular';
import { PostModalComponent } from '@modals/post.modal/post.modal.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  posts: IPost[] = [];
  
  constructor(
    private postDataService: PostDataService,    
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts(){
    this.postDataService.getPosts().subscribe((posts: IPost[]) => {
      this.posts = posts;
    });
  }

  async newPost() {    
    const modal = await this.modalController.create({
      component: PostModalComponent,
      componentProps: { }
    });

    modal.onDidDismiss().then((returnData) => {
      if (returnData !== null && returnData.data.needReload) {
        this.loadPosts();
      }
    });

    return await modal.present();
  }
}

