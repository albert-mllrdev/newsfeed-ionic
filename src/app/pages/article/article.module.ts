import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ArticlePageRoutingModule } from './article-routing.module';

import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule} from 'ngx-filter-pipe';

import { ArticlePage } from './article.page';
import { ArticlesListComponent } from '@lists/articles.list/articles.list.component';
import { TimeAgoPipe } from '@pipes/time-ago.pipe';
import { ArticleModalComponent } from 'src/app/components/modals/article.modal/article.modal.component';
import { ArticleFormComponent } from '@forms/article.form/article.form.component';
import { CategoriesMenuComponent } from 'src/app/components/menus/categories.menu/categories.menu.component';

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
