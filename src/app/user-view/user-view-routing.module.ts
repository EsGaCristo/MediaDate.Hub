import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserViewPage } from './user-view.page';

const routes: Routes = [
  {
    path: '',
    component: UserViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserViewPageRoutingModule {}
