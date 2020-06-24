import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ArticleDataService } from '@data/article.data.service';
import { IArticle } from '@interfaces/article';

@Component({
  selector: 'app-article-form',
  templateUrl: './article.form.component.html',
  styleUrls: ['./article.form.component.scss'],
})
export class ArticleFormComponent implements OnInit {

  @Input() articleId!: number;
  @Output() validationStatusChange = new EventEmitter();

  articleForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    source: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    publishedAt: new FormControl(''),
  });

  get formData(){
    return this.articleForm.value;
  }

  get hasChanges(){
    return this.articleForm.dirty;
  }

  constructor(private articleDataService: ArticleDataService) { }

  ngOnInit() {
    this.loadArticle();
    this.bindValidation();
  }

  bindValidation(){
    this.articleForm.valueChanges.subscribe(
      () => {
        this.validationStatusChange.emit((this.articleForm.status.toLowerCase() === 'valid'));
      },
    );
  }

  loadArticle(){
    if (this.articleId){
      this.articleDataService.getArticle(this.articleId).subscribe((article: IArticle) => {
        if (article){
          this.articleForm.setValue(article);
        }
      });
    }
  }
}
