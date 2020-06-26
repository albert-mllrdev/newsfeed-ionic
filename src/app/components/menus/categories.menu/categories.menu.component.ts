import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { ArticleDataService } from '@data/article.data.service';
import { ICategory } from '@interfaces/category';

@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories.menu.component.html',
  styleUrls: ['./categories.menu.component.scss'],
})
export class CategoriesMenuComponent implements OnInit {
  @Output() setCategoryEvent = new EventEmitter();
  
  categories: ICategory[] = [];
  currentCategoryId?: number | null;

  constructor(  
    private articleDataService: ArticleDataService,
    private menuController: MenuController
  ) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories(){
    this.articleDataService.getCategories().subscribe((categories: ICategory[]) => {
      this.categories = categories;
    });
  }

  setCategory(categoryId?: number | null){    
    this.currentCategoryId = categoryId;
    this.close();
    this.setCategoryEvent.emit(categoryId);
  }

  close(){
    this.menuController.close();
  }
}
