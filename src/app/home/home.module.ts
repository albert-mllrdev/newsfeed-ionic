import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { OrderModule } from 'ngx-order-pipe';

import { HomePageRoutingModule } from './home-routing.module';
import { ArticlesListComponent } from '@lists/articles.list/articles.list.component';
import { TimeAgoPipe } from '@pipes/time-ago.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    OrderModule    
  ],
  declarations: [HomePage, ArticlesListComponent, TimeAgoPipe]
})
export class HomePageModule {}
