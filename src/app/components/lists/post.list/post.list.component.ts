import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { IPost } from '@interfaces/post';
import { PostModalComponent } from '@modals/post.modal/post.modal.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post.list.component.html',
  styleUrls: ['./post.list.component.scss']
})
export class PostListComponent implements OnInit {
  @Input() posts: IPost[] = [];
  @Output() needReloadEvent = new EventEmitter<string>();
  
  postFilter = { categoryId : '' };
  postTextFilter = { $or: [{ title: ''}, { source: '' }, { content: '' }] };

  constructor(public modalController: ModalController) { }

  ngOnInit() { }

  async showPost(postId: number){
    const modal = await this.modalController.create({
      component: PostModalComponent,
      componentProps: {
        postId
      }
    });

    modal.onDidDismiss().then((returnData) => {
      if (returnData !== null && returnData.data.needReload) {
        this.needReloadEvent.emit();
      }
    });

    return await modal.present();
  }
  
  getCategoryFilter(){
    return this.postFilter.categoryId;
  }

  setCategoryFilter(categoryId?: number){
    this.postFilter.categoryId = (categoryId) ? categoryId.toString() : '';
  }

  setFilterSearch(searchText: string){
    this.postTextFilter = { 
      $or: [{ title: searchText }, { source: searchText }, { content: searchText }] 
    };
  }
}
