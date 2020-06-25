import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { IArticle } from '@interfaces/article';
import { ArticleModalComponent } from '../../modals/article.modal/article.modal.component';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles.list.component.html',
  styleUrls: ['./articles.list.component.scss']
})
export class ArticlesListComponent implements OnInit {

  @Input() articles: IArticle[] = [];
  @Output() needReloadEvent = new EventEmitter<string>();

  constructor(public modalController: ModalController) { }

  ngOnInit() { }

  async showArticle(articleId: number){
    const modal = await this.modalController.create({
      component: ArticleModalComponent,
      componentProps: {
        articleId,
      }
    });

    modal.onDidDismiss().then((returnData) => {
      if (returnData !== null && returnData.data.needReload) {
        this.needReloadEvent.emit();
      }
    });

    return await modal.present();
  }
}
