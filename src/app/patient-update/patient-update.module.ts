import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientUpdatePageRoutingModule } from './patient-update-routing.module';

import { PatientUpdatePage } from './patient-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientUpdatePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PatientUpdatePage]
})
export class PatientUpdatePageModule {}
