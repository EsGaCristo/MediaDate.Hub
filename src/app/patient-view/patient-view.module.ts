import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientViewPageRoutingModule } from './patient-view-routing.module';

import { PatientViewPage } from './patient-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientViewPageRoutingModule
  ],
  declarations: [PatientViewPage]
})
export class PatientViewPageModule {}
