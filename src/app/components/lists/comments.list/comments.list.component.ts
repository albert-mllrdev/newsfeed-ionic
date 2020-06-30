import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IComment } from '@interfaces/IComment';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments.list.component.html',
  styleUrls: ['./comments.list.component.scss'],
})
export class CommentsListComponent implements OnInit {
  @Input() comments: IComment[] = [];

  commentForm: FormGroup = this.formBuilder.group({
    comment: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() { }

  saveComment(){
    if (this.commentForm.valid){
      const newComment: IComment =  {
        text: this.commentForm.value.comment,
        publishedAt: new Date()
      };
      this.comments.push(newComment);
      this.commentForm.setValue({comment: ''});
    }
  }
}
