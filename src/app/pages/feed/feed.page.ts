import { Component, OnInit } from '@angular/core';
import { IPost } from '@interfaces/IPost';
import { PostDataService } from '@data/post.data.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  posts: IPost[] = [];
  
  constructor(
    private postDataService: PostDataService
  ) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts(){
    this.postDataService.getPosts().subscribe((posts: IPost[]) => {
      this.posts = posts;
    });
  }
}

