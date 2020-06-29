import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { PostDataService } from '@data/post.data.service';
import { IPost } from '@interfaces/post';
import { ICategory } from '@interfaces/category';

@Component({
  selector: 'app-post-form',
  templateUrl: './post.form.component.html',
  styleUrls: ['./post.form.component.scss'],
})
export class PostFormComponent implements OnInit {
  @Input() postId!: number;
  @Input() defaultCategoryId!: number;
  @Output() validationStatusChange = new EventEmitter();

  postForm = new FormGroup({
    id: new FormControl(''),
    categoryId: new FormControl('', Validators.required),
    title: new FormControl(''),
    source: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    publishedAt: new FormControl(''),
    isLiked: new FormControl(''),    
    comments: new FormControl('')
  });

  get formData(){
    return this.postForm.value;
  }

  get hasChanges(){
    return this.postForm.dirty;
  }
  
  categories: ICategory[] = [];

  constructor(private postDataService: PostDataService) { }

  ngOnInit() {
    this.loadPost();
    this.loadCategories();
    this.bindValidation();
  }

  bindValidation(){
    this.postForm.valueChanges.subscribe(() => {
      this.validationStatusChange.emit((this.postForm.status.toLowerCase() === 'valid'));
    });
  }

  loadPost(){
    if (this.postId){
      this.postDataService.getPost(this.postId).subscribe((post: IPost) => {
        if (post){
          this.postForm.setValue(post);
        }
      });
    }
    else {
      this.postForm.patchValue({ categoryId: (this.defaultCategoryId) ? this.defaultCategoryId : "1" });
    }
  }

  loadCategories(){
    this.postDataService.getCategories().subscribe((categories: ICategory[]) => {
      this.categories = categories;
    });
  }
}
