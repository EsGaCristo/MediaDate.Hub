import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserViewPageRoutingModule } from './user-view-routing.module';

import { UserViewPage } from './user-view.page';

=======
import { CommonModule, registerLocaleData} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { UserViewPageRoutingModule } from './user-view-routing.module';

import { UserViewPage } from './user-view.page';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);
>>>>>>> test
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
<<<<<<< HEAD
    UserViewPageRoutingModule
=======
    UserViewPageRoutingModule,
    ReactiveFormsModule
>>>>>>> test
  ],
  declarations: [UserViewPage]
})
export class UserViewPageModule {}
