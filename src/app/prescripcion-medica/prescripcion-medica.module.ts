import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrescripcionMedicaPageRoutingModule } from './prescripcion-medica-routing.module';

import { PrescripcionMedicaPage } from './prescripcion-medica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrescripcionMedicaPageRoutingModule
  ],
  declarations: [PrescripcionMedicaPage]
})
export class PrescripcionMedicaPageModule {}
