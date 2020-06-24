import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { IArticle } from '../interfaces/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleDataService {

  hasInitialLoad = false;
  articles: IArticle [] = [];

  constructor(private http: HttpClient) {  }
  
  getArticles(): Observable<IArticle[]> {
    if (this.hasInitialLoad){
      return of(this.articles);
    }

    return this.http.get<IArticle[]>('assets/articles.json')
      .pipe(
        map((articles: IArticle[]) => {
          this.hasInitialLoad = true;
          this.articles = articles;
          return articles;
        })
      );
  }

  getArticle(articleId: number): Observable<IArticle> {
    return this.getArticles().pipe(
      map(articles => {
        const [articleResult] = articles.filter((article: IArticle)  => article.id === articleId);
        return articleResult;
      })
    );
  }  

  saveArticle(formData: IArticle) {
    const [articleResult] = this.articles.filter((article: IArticle)  => article.id === formData.id);
    if (articleResult){
      this.articles[this.articles.indexOf(articleResult)] = {... formData};
    } else {
      formData.id = Math.max.apply(Math, this.articles.map((article: IArticle) => article.id)) + 1;
      formData.publishedAt = new Date();
      this.articles.push(formData);
    }
  }

  deleteArticle(articleId: number){
    this.articles = this.articles.filter((article: IArticle) => article.id !== articleId);
  }
}
