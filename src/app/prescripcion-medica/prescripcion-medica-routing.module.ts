import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrescripcionMedicaPage } from './prescripcion-medica.page';

const routes: Routes = [
  {
    path: '',
    component: PrescripcionMedicaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrescripcionMedicaPageRoutingModule {}
