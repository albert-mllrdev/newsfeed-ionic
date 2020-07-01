import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule} from 'ngx-filter-pipe';
import { TimeAgoPipe } from '@albert/pipes/time-ago.pipe';

import { FeedPage } from './feed.page';
import { FeedPageRoutingModule } from './feed-routing.module';
import { PostListComponent } from '@albert/lists/post.list/post.list.component';
import { PostModalComponent } from '@albert/modals/post.modal/post.modal.component';
import { PostFormComponent } from '@albert/forms/post.form/post.form.component';
import { CategoryMenuComponent } from '@albert/menus/categories.menu/categories.menu.component';
import { CommentsListComponent } from '@albert/lists/comments.list/comments.list.component';
import { PostListRecordComponent } from '@albert/lists/post.list.record/post.list.record.component';
import { PostListWrapperComponent } from '@albert/lists/post-list-wrapper/post-list-wrapper.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FeedPageRoutingModule,
    OrderModule,
    FilterPipeModule
  ],
  declarations: [
    FeedPage,
    PostModalComponent, 
    PostFormComponent, 
    PostListWrapperComponent,
    PostListComponent, 
    PostListRecordComponent,
    CategoryMenuComponent,
    CommentsListComponent,
    TimeAgoPipe
  ]
})
export class FeedPageModule {}
