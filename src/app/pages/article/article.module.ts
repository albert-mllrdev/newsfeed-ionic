import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule} from 'ngx-filter-pipe';
import { TimeAgoPipe } from '@pipes/time-ago.pipe';

import { ArticlePage } from './article.page';
import { ArticlePageRoutingModule } from './article-routing.module';
import { ArticlesListComponent } from '@lists/articles.list/articles.list.component';
import { ArticleModalComponent } from '@modals/article.modal/article.modal.component';
import { ArticleFormComponent } from '@forms/article.form/article.form.component';
import { CategoriesMenuComponent } from '@menus/categories.menu/categories.menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ArticlePageRoutingModule,
    OrderModule,
    FilterPipeModule
  ],
  declarations: [
    ArticlePage, 
    ArticleModalComponent, 
    ArticleFormComponent, 
    ArticlesListComponent, 
    CategoriesMenuComponent,
    TimeAgoPipe]
})
export class ArticlePageModule {}
