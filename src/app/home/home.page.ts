import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ArticleModalPage } from '@modal/article.modal/article.modal.page';
import { ArticleDataService } from '@data/article.data.service';
import { IArticle } from '../interfaces/article';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  articles: IArticle[] = [];
  dataReturned: [] | undefined;

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

  async openModal() {
    const modal = await this.modalController.create({
      component: ArticleModalPage,
    });

    return await modal.present();
  }
}
