import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { IArticle } from '@interfaces/article';
import { ICategory } from '@interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class ArticleDataService {

  hasInitialLoad = false;
  articles: IArticle [] = [];
  categories: ICategory [] = [];

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
      formData.id = this.createNewArticleID();
      formData.publishedAt = new Date();
      this.articles.push(formData);
    }
  }

  deleteArticle(articleId: number){
    this.articles = this.articles.filter((article: IArticle) => article.id !== articleId);
  }
    
  getCategories(): Observable<ICategory[]> {   
    if (this.categories?.length){
      return of(this.categories);
    }

    return this.http.get<ICategory[]>('assets/categories.json')
      .pipe(
        map((categories: ICategory[]) => {
          this.categories = categories;
          return categories;
        })
      );
  }

  private createNewArticleID(){
    return (!this.articles.length) ? 1 : Math.max.apply(Math, this.articles.map((article: IArticle) => article.id)) + 1;
  }
}
