import { Component, OnInit, ViewChild } from '@angular/core';
import { IPost } from '@interfaces/post';
import { PostDataService } from '@data/post.data.service';
import { ModalController, IonContent } from '@ionic/angular';

import { PostListComponent } from '@lists/post.list/post.list.component';
import { PostModalComponent } from '@modals/post.modal/post.modal.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  posts: IPost[] = [];

  @ViewChild(PostListComponent) postList!: PostListComponent;
  @ViewChild(IonContent) ionContent!: IonContent;
  
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
      componentProps: {
        defaultCategoryId: this.postList.getCategoryFilter()
      }
    });

    return await modal.present();
  }

  setFilterCategory(categoryId: number){
    this.ionContent.scrollToTop();
    this.postList.setCategoryFilter(categoryId);
  }

  setFilterSearch(event: CustomEvent){
    this.postList.setFilterSearch(event.detail.value);
  }
}

