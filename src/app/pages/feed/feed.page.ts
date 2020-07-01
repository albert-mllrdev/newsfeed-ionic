import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, IonRouterOutlet } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;

import { IPost } from '@albert/interfaces/IPost';
import { PostDataService } from '@albert/data/post.data.service';
import { PostModalComponent } from '@albert/modals/post.modal/post.modal.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  posts: IPost[] = [];
  
  constructor(
    private postDataService: PostDataService,
    public modalController: ModalController,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet
  ) { }

  ngOnInit() {
    this.bindBackButton();
    this.loadPosts();
  }

  bindBackButton(){
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });
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

