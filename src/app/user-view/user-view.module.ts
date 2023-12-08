import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserViewPageRoutingModule } from './user-view-routing.module';

import { UserViewPage } from './user-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserViewPageRoutingModule
  ],
  declarations: [UserViewPage]
})
export class UserViewPageModule {}
