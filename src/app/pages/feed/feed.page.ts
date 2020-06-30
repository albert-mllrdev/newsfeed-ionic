import { Component, OnInit, ViewChild } from '@angular/core';
import { IPost } from '@interfaces/IPost';
import { PostDataService } from '@data/post.data.service';
import { ModalController, IonContent } from '@ionic/angular';

import { PostListComponent } from '@lists/post.list/post.list.component';
import { PostModalComponent } from '@modals/post.modal/post.modal.component';
import { Store } from '@ngrx/store';
import { IFilter } from '@interfaces/IFilter';
import { setFilterText } from 'src/app/store/actions';

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
    private store: Store<{ filter: IFilter }>
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
        defaultCategoryId: 0 // this.postList.getCategoryFilter()
      }
    });

    return await modal.present();
  }

  setFilterSearch(event: CustomEvent){
   this.store.dispatch(setFilterText({ searchText : event.detail.value }));
  }
}

