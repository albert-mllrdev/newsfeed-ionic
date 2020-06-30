import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup,  Validators, FormBuilder } from '@angular/forms';
import { ToastController, AlertController } from '@ionic/angular';
import { Store, select } from '@ngrx/store';

import { PostDataService } from '@albert/data/post.data.service';
import { ICategory } from '@albert/interfaces/ICategory';
import { IPostFilter } from '@albert/interfaces/IPostFilter';

@Component({
  selector: 'app-post-form',
  templateUrl: './post.form.component.html',
  styleUrls: ['./post.form.component.scss'],
})
export class PostFormComponent implements OnInit {
  @Input() postId!: number;
  @Output() closeForm = new EventEmitter();

  categories: ICategory[] = [];

  postForm: FormGroup = this.formBuilder.group({
    id: [''],
    categoryId: ['', Validators.required],
    title: [''],
    author:  ['', Validators.required],
    content:  ['', Validators.required],
    publishedAt:  [''],
    isLiked: [''], 
    comments:  ['']
  });
  
  constructor( 
    public alertController: AlertController, 
    private toastController: ToastController,   
    private formBuilder: FormBuilder,
    private postDataService: PostDataService,   
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
        this.postForm.patchValue({ categoryId: (filter.categoryId && filter.categoryId !== 0) ? filter.categoryId : 1 });
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
