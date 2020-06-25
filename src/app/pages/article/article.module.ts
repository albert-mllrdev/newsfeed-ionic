import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ArticlePageRoutingModule } from './article-routing.module';

import { OrderModule } from 'ngx-order-pipe';
import { ArticlePage } from './article.page';
import { ArticlesListComponent } from '@lists/articles.list/articles.list.component';
import { TimeAgoPipe } from '@pipes/time-ago.pipe';
import { ArticleModalComponent } from 'src/app/components/modals/article.modal/article.modal.component';
import { ArticleFormComponent } from '@forms/article.form/article.form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ArticlePageRoutingModule,
    OrderModule
  ],
  declarations: [
    ArticlePage, 
    ArticleModalComponent, 
    ArticleFormComponent, 
    ArticlesListComponent, 
    TimeAgoPipe]
})
export class ArticlePageModule {}
