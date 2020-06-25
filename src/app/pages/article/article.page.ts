import { Component, OnInit } from '@angular/core';
import { IArticle } from '@interfaces/article';
import { ArticleDataService } from '@data/article.data.service';
import { ModalController } from '@ionic/angular';
import { ArticleModalComponent } from 'src/app/components/modals/article.modal/article.modal.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {
  articles: IArticle[] = [];

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
      component: ArticleModalComponent
    });

    return await modal.present();
  }
}
