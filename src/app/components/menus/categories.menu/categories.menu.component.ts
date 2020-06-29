import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { PostDataService } from '@data/post.data.service';
import { ICategory } from '@interfaces/category';
import { IPost } from '@interfaces/post';

@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories.menu.component.html',
  styleUrls: ['./categories.menu.component.scss'],
})
export class CategoriesMenuComponent implements OnInit {
  @Input() posts: IPost[] = [];
  @Output() setCategoryEvent = new EventEmitter();
  
  categories: ICategory[] = [];
  currentCategoryId?: number | null;

  constructor(  
    private postDataService: PostDataService,
    private menuController: MenuController
  ) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories(){
    this.postDataService.getCategories().subscribe((categories: ICategory[]) => {
      this.categories = categories;
    });
  }

  setCategory(categoryId?: number | null){    
    this.currentCategoryId = categoryId;
    this.close();
    this.setCategoryEvent.emit(categoryId);
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
