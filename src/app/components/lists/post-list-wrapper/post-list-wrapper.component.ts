import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IPostFilter } from '@interfaces/IPostFilter';
import { PostDataService } from '@data/post.data.service';
import { IPost } from '@interfaces/IPost';
import { setFilterText } from 'src/app/store/actions';
import { ModalController } from '@ionic/angular';
import { PostModalComponent } from '@modals/post.modal/post.modal.component';

@Component({
  selector: 'app-post-list-wrapper',
  templateUrl: './post-list-wrapper.component.html',
  styleUrls: ['./post-list-wrapper.component.scss'],
})
export class PostListWrapperComponent implements OnInit {
  @Input() posts: IPost[] = [];

  postFilter = { categoryId: '' };
  postTextFilter = { $or: [{ title: ''}, { source: '' }, { content: '' }] };

  constructor(
    private store: Store<{ filter: IPostFilter }>,
    private postDataService: PostDataService,    
    public modalController: ModalController) { }

  ngOnInit() {
    this.watchFilterProperty();
  }  

  setFilterSearch(event: CustomEvent){
    this.store.dispatch(setFilterText({ searchText : event.detail.value }));
  }

  watchFilterProperty(){
    this.store.pipe(select('filter')).subscribe(filter => {
      this.postFilter.categoryId = (filter.categoryId) ? filter.categoryId.toString() : '';

      this.postTextFilter = { 
        $or: [{ title: filter.searchText }, { source: filter.searchText }, { content: filter.searchText }] 
      };
    });
  }  

  async newPost() {    
    const modal = await this.modalController.create({
      component: PostModalComponent,
      componentProps: { }
    });

    modal.onDidDismiss().then((returnData) => {
      if (returnData !== null && returnData.data.needReload) {
        this.reload();
      }
    });

    return await modal.present();
  }

  reload(){    
    this.postDataService.getPosts().subscribe((posts: IPost[]) => {
      this.posts = posts;
    });
  }
}
