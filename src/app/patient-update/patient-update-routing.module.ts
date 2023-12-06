import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientUpdatePage } from './patient-update.page';

const routes: Routes = [
  {
    path: '',
    component: PatientUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientUpdatePageRoutingModule {}
