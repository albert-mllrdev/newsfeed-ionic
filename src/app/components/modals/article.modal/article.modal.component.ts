import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, ToastController, AlertController } from '@ionic/angular';

import { ArticleFormComponent } from '@forms/article.form/article.form.component';
import { ArticleDataService } from '@data/article.data.service';

@Component({
  selector: 'app-article.modal',
  templateUrl: './article.modal.component.html',
  styleUrls: ['./article.modal.component.scss'],
})
export class ArticleModalComponent implements OnInit {  
  isValid!: boolean;

  @Input() articleId!: number;
  @Input() defaultCategoryId!: number;
  @ViewChild(ArticleFormComponent) articleForm!: ArticleFormComponent;

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    public alertController: AlertController,
    private articleDataService: ArticleDataService
  ) { }

  ngOnInit() { }

  close(needReload: boolean = false) {
    this.modalController.dismiss({
      needReload
    });
  }

  saveArticle(){
    this.showToast((this.articleForm.formData.id) ? 'Article saved' : 'Article added');
    this.articleDataService.saveArticle(this.articleForm.formData);
    this.close(true);
  }

  deleteArticle(){
    this.showToast('Article deleted');
    this.articleDataService.deleteArticle(this.articleId);
    this.close(true);
  }

  validationStatusChange(isValid: boolean){
    this.isValid = isValid;
  }

  async confirmClose(){
    if (this.articleForm.hasChanges) {
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
            this.deleteArticle();
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
