import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { IPost } from '@albert/interfaces/IPost';
import { IPostFilter } from '@albert/interfaces/IPostFilter';
import { PostDataService } from '@albert/data/post.data.service';
import { setFilterText } from '@albert/store/actions';
@Component({
  selector: 'app-post-list-wrapper',
  templateUrl: './post-list-wrapper.component.html',
  styleUrls: ['./post-list-wrapper.component.scss'],
})
export class PostListWrapperComponent implements OnInit {
  @Input() posts: IPost[] = [];

  postFilter = { categoryId: '' };
  postTextFilter = { $or: [{ title: ''}, { author: '' }, { content: '' }] };

  constructor(
    private store: Store<{ filter: IPostFilter }>,
    private postDataService: PostDataService) { }

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
        $or: [{ title: filter.searchText }, { author: filter.searchText }, { content: filter.searchText }] 
      };
    });
  }

  reload(){    
    this.postDataService.getPosts().subscribe((posts: IPost[]) => {
      this.posts = posts;
    });
  }
}
