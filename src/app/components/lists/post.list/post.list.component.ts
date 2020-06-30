import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { IPost } from '@interfaces/IPost';
import { PostModalComponent } from '@modals/post.modal/post.modal.component';
import { Store, select } from '@ngrx/store';
import { IPostFilter } from '@interfaces/IPostFilter';
import { PostDataService } from '@data/post.data.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post.list.component.html',
  styleUrls: ['./post.list.component.scss']
})
export class PostListComponent implements OnInit {
  @Input() posts: IPost[] = [];
  
  postFilter = { categoryId: '' };
  postTextFilter = { $or: [{ title: ''}, { source: '' }, { content: '' }] };

  constructor(
    public modalController: ModalController,
    private store: Store<{ filter: IPostFilter }>,
    private postDataService: PostDataService
  ) { }

  ngOnInit() {
    this.watchFilterProperty();
  }

  watchFilterProperty(){
    this.store.pipe(select('filter')).subscribe(filter => {
      this.postFilter.categoryId = (filter.categoryId) ? filter.categoryId.toString() : '';

      this.postTextFilter = { 
        $or: [{ title: filter.searchText }, { source: filter.searchText }, { content: filter.searchText }] 
      };
    });
  }

  async showPost(postId: number){
    const modal = await this.modalController.create({
      component: PostModalComponent,
      componentProps: {
        postId
      }
    });

    modal.onDidDismiss().then((returnData) => {
      if (returnData !== null && returnData.data.needReload) {
        this.postDataService.getPosts().subscribe((posts: IPost[]) => {
          this.posts = posts;
        });
      }
    });

    return await modal.present();
  }
}
