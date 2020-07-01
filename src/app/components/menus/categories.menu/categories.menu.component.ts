import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Store, select } from '@ngrx/store';

import { ICategory } from '@albert/interfaces/ICategory';
import { IPost } from '@albert/interfaces/IPost';
import { IPostFilter } from '@albert/interfaces/IPostFilter';
import { PostDataService } from '@albert/data/post.data.service';
import { setFilterCategory } from '@albert/store/actions';

@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories.menu.component.html',
  styleUrls: ['./categories.menu.component.scss'],
})
export class CategoryMenuComponent implements OnInit {
  posts: IPost[] = [];
  categories: ICategory[] = [];
  currentCategoryId: number | undefined;

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
    return this.posts.filter((post: IPost)  => +post.categoryId === categoryId).length;
  }

  close(){
    this.menuController.close();
  }
}
