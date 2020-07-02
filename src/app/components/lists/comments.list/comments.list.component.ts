import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';

import { IComment } from '@albert/interfaces/IComment';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments.list.component.html',
  styleUrls: ['./comments.list.component.scss'],
})
export class CommentsListComponent implements OnInit {
  @Input() comments: IComment[] = [];

  comment: FormControl = this.formBuilder.control('', Validators.required);

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() { }

  saveComment(){
    if (this.comment.valid){
      const newComment: IComment =  {
        text: this.comment.value,
        publishedAt: new Date()
      };
      this.comments.push(newComment);
      this.comment.setValue('');
    }
  }
}
