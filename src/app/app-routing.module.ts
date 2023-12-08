import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'menu',
    canActivate: [AuthGuard],
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'agregar-cita',
    canActivate: [AuthGuard],
    loadChildren: () => import('./agregar-cita/agregar-cita.module').then( m => m.AgregarCitaPageModule)
  },
  {
    path: 'patient-view',
    loadChildren: () => import('./patient-view/patient-view.module').then( m => m.PatientViewPageModule)
  },
  {
    path: 'patient-update',
    canActivate: [AuthGuard],
    loadChildren: () => import('./patient-update/patient-update.module').then( m => m.PatientUpdatePageModule)
  },
  {
    path: 'user-view',
    loadChildren: () => import('./user-view/user-view.module').then( m => m.UserViewPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
