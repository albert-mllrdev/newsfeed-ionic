import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { IArticle } from '@interfaces/article';
import { ArticleModalComponent } from '@modals/article.modal/article.modal.component';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles.list.component.html',
  styleUrls: ['./articles.list.component.scss']
})
export class ArticlesListComponent implements OnInit {
  @Input() articles: IArticle[] = [];
  @Output() needReloadEvent = new EventEmitter<string>();
  
  articleFilter = { categoryId : '' };
  articleTextFilter = { $or: [{ title: ''}, { source: '' }, { content: '' }] };

  constructor(public modalController: ModalController) { }

  ngOnInit() { }

  async showArticle(articleId: number){
    const modal = await this.modalController.create({
      component: ArticleModalComponent,
      componentProps: {
        articleId
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
    return this.articleFilter.categoryId;
  }

  setCategoryFilter(categoryId?: number){
    this.articleFilter.categoryId = (categoryId) ? categoryId.toString() : '';
  }

  setFilterSearch(searchText: string){
    this.articleTextFilter = { 
      $or: [{ title: searchText }, { source: searchText }, { content: searchText }] 
    };
  }
}
