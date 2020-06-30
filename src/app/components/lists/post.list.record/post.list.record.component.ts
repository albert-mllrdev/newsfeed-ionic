import { Component, OnInit, Input } from '@angular/core';
import { IPost } from '@interfaces/IPost';

@Component({
  selector: 'app-post-list-record',
  templateUrl: './post.list.record.component.html',
  styleUrls: ['./post.list.record.component.scss'],
})
export class PostListRecordComponent implements OnInit {
  @Input() post!: IPost;

  allowedVisibleContentLength = 175;
  showComments = false;

  constructor() { }

  ngOnInit() {}

  showComment(){
    this.showComments = !this.showComments;
  }

  toggleLike(){
    this.post.isLiked = !this.post.isLiked;
  }

  getViewableContent(content: string){
    return (content.length <  this.allowedVisibleContentLength) ? content : `${content.slice(0, this.allowedVisibleContentLength)}...`;
  }
}
