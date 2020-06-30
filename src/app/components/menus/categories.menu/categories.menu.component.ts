import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { PostDataService } from '@data/post.data.service';
import { ICategory } from '@interfaces/ICategory';
import { IPost } from '@interfaces/IPost';
import { setFilterCategory } from 'src/app/store/actions';
import { IPostFilter } from '@interfaces/IPostFilter';

@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories.menu.component.html',
  styleUrls: ['./categories.menu.component.scss'],
})
export class CategoriesMenuComponent implements OnInit {
  posts: IPost[] = [];
  categories: ICategory[] = [];
  currentCategoryId!: number;

  constructor(  
    private postDataService: PostDataService,
    private menuController: MenuController,
    private store: Store<{ filter: IPostFilter }> 
  ) { }

  ngOnInit() {
    this.loadPosts();
    this.watchCategoryID();
  }

  watchCategoryID(){
    this.store.pipe(select('filter')).subscribe(filter =>{
      if (filter.categoryId) {
        this.currentCategoryId = filter.categoryId;
      }
    });
  }
  
  loadPosts(){
    this.postDataService.getPosts().subscribe((posts: IPost[]) => {
      this.posts = posts;
      this.loadCategories();
    });
  }

  loadCategories(){
    this.postDataService.getCategories().subscribe((categories: ICategory[]) => {
      this.categories = categories;
    });
  }

  setCategory(newCategoryId: number){    
    this.store.dispatch(setFilterCategory({ categoryId : newCategoryId }));
    this.close();
  }

  getTotalPostsInCategory(categoryId: number){
    if (this.posts){
      return this.posts.filter((post: IPost)  => +post.categoryId === categoryId).length;
    }
    return 0;
  }

  close(){
    this.menuController.close();
  }
}
