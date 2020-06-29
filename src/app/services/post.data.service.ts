import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPost } from '@interfaces/post';
import { ICategory } from '@interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class PostDataService {
  private isInitialized  = false;
  private posts: IPost [] = [];
  private categories: ICategory [] = [];

  constructor(private http: HttpClient) {  }
  
  getPosts(): Observable<IPost[]> {
    if (this.isInitialized ){
      return of(this.posts);
    }

    return this.http.get<IPost[]>('assets/posts.json')
      .pipe(
        map((posts: IPost[]) => {
          this.isInitialized = true;
          this.posts = posts;
          return posts;
        })
      );
  }

  getPost(postId: number): Observable<IPost> {
    return this.getPosts().pipe(
      map((posts: IPost[]) => {
        const [postResult] = posts.filter((post: IPost)  => post.id === postId);
        return postResult;
      })
    );
  }  

  savePost(formData: IPost) {
    const [postResult] = this.posts.filter((post: IPost)  => post.id === formData.id);
    if (postResult){
      this.posts[this.posts.indexOf(postResult)] = {... formData};
    } else {
      formData.id = this.createNewPostID();
      formData.publishedAt = new Date();
      formData.isLiked = false;
      formData.comments = [];
      this.posts.push(formData);
    }
  }

  deletePost(postId: number){
    this.posts = this.posts.filter((post: IPost) => post.id !== postId);
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

  private createNewPostID(){
    return (!this.posts.length) ? 1 : Math.max.apply(Math, this.posts.map((post: IPost) => post.id)) + 1;
  }
}
