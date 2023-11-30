import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarCitaPage } from './agregar-cita.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarCitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarCitaPageRoutingModule {}
