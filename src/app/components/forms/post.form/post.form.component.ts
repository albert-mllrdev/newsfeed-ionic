import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { PostDataService } from '@data/post.data.service';
import { ICategory } from '@interfaces/ICategory';
import { Store, select } from '@ngrx/store';
import { IPostFilter } from '@interfaces/IPostFilter';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-post-form',
  templateUrl: './post.form.component.html',
  styleUrls: ['./post.form.component.scss'],
})
export class PostFormComponent implements OnInit {
  @Input() postId!: number;
  @Output() closeForm = new EventEmitter();

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
  
  categories: ICategory[] = [];

  constructor(
    private postDataService: PostDataService,    
    private toastController: ToastController,
    public alertController: AlertController,
    private store: Store<{ filter: IPostFilter }>) { }

  ngOnInit() {
    this.loadPost();
    this.loadCategories();
  }

  loadPost(){
    if (this.postId){
      const post = this.postDataService.getPost(this.postId);
      if (post) {
        this.postForm.setValue(post);
      }
    }    
    else {      
      this.store.pipe(select('filter')).subscribe(filter => {        
        this.postForm.patchValue({ categoryId: (filter.categoryId && filter.categoryId !== 0) ? filter.categoryId.toString() : '1' });
      });
    }
  }

  loadCategories(){
    this.postDataService.getCategories().subscribe((categories: ICategory[]) => {
      this.categories = categories;
    });
  }  

  savePost(){
    this.showToast((this.postForm.value.id) ? 'Post saved' : 'Post added');
    this.postDataService.savePost(this.postForm.value);
    this.closeForm.emit(true);
  }

  deletePost(){
    this.showToast('Post deleted');
    this.postDataService.deletePost(this.postId);
    this.closeForm.emit(true);
  }

  async confirmClose(){
    if (this.postForm.dirty) {
      const alert = await this.alertController.create({
        header: 'Discard changes',
        message: 'Are you sure?',
        buttons: [
          {
            text: 'No'
          },
          {
            text: 'Yes',
            handler: () => {              
              this.closeForm.emit();
            }
          }
        ]
      });
      await alert.present();
    } 
    else {
      this.closeForm.emit();
    }
  }

  async confirmDelete(){
    const alert = await this.alertController.create({
      header: 'Delete',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'No'
        },
        {
          text: 'Yes',
          handler: () => {
            this.deletePost();
          }
        }
      ]
    });
    await alert.present();
   }

  async showToast(toastMessage: string) {
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: 2000,
      color: 'dark'
    });
    toast.present();
  }  
}
