import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { OrderModule } from 'ngx-order-pipe';
import { TimeagoModule, TimeagoClock } from 'ngx-timeago';

import { HomePageRoutingModule } from './home-routing.module';
import { ArticlesListComponent } from '@lists/articles.list/articles.list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    OrderModule,
    TimeagoModule.forRoot()
  ],
  declarations: [HomePage, ArticlesListComponent]
})
export class HomePageModule {}
