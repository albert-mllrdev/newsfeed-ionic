import { Component, OnInit, ViewChild } from '@angular/core';
import { IArticle } from '@interfaces/article';
import { ArticleDataService } from '@data/article.data.service';
import { ModalController } from '@ionic/angular';

import { ArticlesListComponent } from '@lists/articles.list/articles.list.component';
import { ArticleModalComponent } from '@modals/article.modal/article.modal.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {
  articles: IArticle[] = [];

  @ViewChild(ArticlesListComponent) articleList!: ArticlesListComponent;

  constructor(
    private articleDataService: ArticleDataService,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.loadArticles();
  }

  loadArticles(){
    this.articleDataService.getArticles().subscribe((articles: IArticle[]) => {
      this.articles = articles;
    });
  }

  async newArticle() {    
    const modal = await this.modalController.create({
      component: ArticleModalComponent,
      componentProps: {
        defaultCategoryId: this.articleList.getCategoryFilter()
      }
    });

    return await modal.present();
  }

  setFilterCategory(categoryId: number){
    this.articleList.setCategoryFilter(categoryId);
  }

  setFilterSearch(event: CustomEvent){
    this.articleList.setFilterSearch(event.detail.value);
  }
}
