import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, ToastController, AlertController } from '@ionic/angular';

import { PostFormComponent } from '@forms/post.form/post.form.component';
import { PostDataService } from '@data/post.data.service';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post.modal.component.html',
  styleUrls: ['./post.modal.component.scss'],
})
export class PostModalComponent implements OnInit {  
  isValid!: boolean;

  @Input() postId!: number;
  @ViewChild(PostFormComponent) postForm!: PostFormComponent;

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    public alertController: AlertController,
    private postDataService: PostDataService
  ) { }

  ngOnInit() { }

  close(needReload: boolean = false) {
    this.modalController.dismiss({
      needReload
    });
  }

  savePost(){
    this.showToast((this.postForm.formData.id) ? 'Post saved' : 'Post added');
    this.postDataService.savePost(this.postForm.formData);
    this.close(true);
  }

  deletePost(){
    this.showToast('Post deleted');
    this.postDataService.deletePost(this.postId);
    this.close(true);
  }

  validationStatusChange(isValid: boolean){
    this.isValid = isValid;
  }

  async confirmClose(){
    if (this.postForm.hasChanges) {
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
              this.close();
            }
          }
        ]
      });
      await alert.present();
    } 
    else {
      this.close();
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
