import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule} from 'ngx-filter-pipe';
import { TimeAgoPipe } from '@pipes/time-ago.pipe';
import { DateFnsModule } from 'ngx-date-fns';

import { FeedPage } from './feed.page';
import { FeedPageRoutingModule } from './feed-routing.module';
import { PostListComponent } from '@lists/post.list/post.list.component';
import { PostModalComponent } from '@modals/post.modal/post.modal.component';
import { PostFormComponent } from '@forms/post.form/post.form.component';
import { CategoryMenuComponent } from '@menus/categories.menu/categories.menu.component';
import { CommentsListComponent } from '@lists/comments.list/comments.list.component';
import { PostListRecordComponent } from '@lists/post.list.record/post.list.record.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FeedPageRoutingModule,
    OrderModule,
    FilterPipeModule,
    DateFnsModule.forRoot()
  ],
  declarations: [
    FeedPage,
    PostModalComponent, 
    PostFormComponent, 
    PostListComponent, 
    PostListRecordComponent,
    CategoryMenuComponent,
    CommentsListComponent,
    TimeAgoPipe
  ]
})
export class FeedPageModule {}
