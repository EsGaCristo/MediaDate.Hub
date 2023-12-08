import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { UserViewPageRoutingModule } from './user-view-routing.module';

import { UserViewPage } from './user-view.page';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserViewPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UserViewPage]
})
export class UserViewPageModule {}
