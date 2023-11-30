import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-cita',
  templateUrl: './agregar-cita.page.html',
  styleUrls: ['./agregar-cita.page.scss'],
})
export class AgregarCitaPage {

  citaForm: FormGroup;
  pacientes: any[] = [
    {
      id: 1,
      nombre: 'Juan Pérez'
    },
    {
      id: 2,
      nombre: 'María López'
    },
    {
      id: 3,
      nombre: 'Pedro Martínez'
    }
  ];
  opcion: string = this.pacientes[0].nombre;
  estatus: any[] = [
    {
      id: 1,
      nombre: 'Pendiente'
    },
    {
      id: 2,
      nombre: 'Cancelada'
    },
    {
      id: 3,
      nombre: 'Confirmada'
    }
  ];
  opcionEstatus: string = this.estatus[0].nombre;

  constructor(private formBuilder: FormBuilder) { 
    this.citaForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      nombre: ['', Validators.required],
      estatus: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      descripcion: ['', Validators.required]
    });  
  }

}
