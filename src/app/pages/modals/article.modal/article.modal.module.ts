import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticleModalPageRoutingModule } from './article.modal-routing.module';

import { ArticleModalPage } from './article.modal.page';
import { ArticleFormComponent } from '@forms/article/article.form/article.form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ArticleModalPageRoutingModule
  ],
  declarations: [ArticleModalPage, ArticleFormComponent]
})
export class ArticleModalPageModule {}
