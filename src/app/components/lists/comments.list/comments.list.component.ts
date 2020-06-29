import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IComment } from '@interfaces/comment';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments.list.component.html',
  styleUrls: ['./comments.list.component.scss'],
})
export class CommentsListComponent implements OnInit {
  @Input() comments: IComment[] = [];

  commentForm = new FormGroup({
    comment: new FormControl('')
  });


  constructor() { }

  ngOnInit() {

  }

  saveComment(){
    if (this.commentForm.value.comment){
      const newComment: IComment =  {
        text: this.commentForm.value.comment,
        publishedAt: new Date()
      };
      this.comments.push(newComment);
      this.commentForm.setValue({comment: ''});
    }
  }
}
