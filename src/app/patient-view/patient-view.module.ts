import { NgModule } from '@angular/core';
import { CommonModule , registerLocaleData} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { PatientViewPageRoutingModule } from './patient-view-routing.module';

import { PatientViewPage } from './patient-view.page';
import localeEs from '@angular/common/locales/es';
import { DatePipe } from '@angular/common';
registerLocaleData(localeEs);
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientViewPageRoutingModule,
    ReactiveFormsModule,
    DatePipe
  ],
  declarations: [PatientViewPage]
})
export class PatientViewPageModule {}
