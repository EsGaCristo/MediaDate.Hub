import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AgregarCitaPageRoutingModule } from './agregar-cita-routing.module';
import { AgregarCitaPage } from './agregar-cita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AgregarCitaPageRoutingModule
  ],
  declarations: [AgregarCitaPage]
})
export class AgregarCitaPageModule {}
