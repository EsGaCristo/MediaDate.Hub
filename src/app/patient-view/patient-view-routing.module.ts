import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientViewPage } from './patient-view.page';

const routes: Routes = [
  {
    path: '',
    component: PatientViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientViewPageRoutingModule {}
