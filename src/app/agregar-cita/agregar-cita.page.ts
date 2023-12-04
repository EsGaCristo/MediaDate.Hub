import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Paciente } from '../models/paciente.model';
import { Cita } from '../models/cita.model';
import { PacienteService } from '../services/paciente.service';
import { CitaService } from '../services/cita.service';
import { format, parseISO } from 'date-fns';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-cita',
  templateUrl: './agregar-cita.page.html',
  styleUrls: ['./agregar-cita.page.scss'],
})
export class AgregarCitaPage implements OnInit {
  citaForm: FormGroup;
  public paciente?: Paciente;
  selectedMode = 'date';
  showPicker = false;
  dateValue = format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z';
  formattedString = '';
  hoy = format(new Date(), 'yyyy-MM-dd');

  constructor(
    private formBuilder: FormBuilder,
    private pacienteService: PacienteService,
    private toastController: ToastController,
    private citaService: CitaService
  ) {
    this.formattedString = format(
      parseISO(format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z'),
      'HH:mm,MMM d, yyyy'
    );
    this.citaForm = this.formBuilder.group({
      fecha: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.cargarPaciente();
  }

  dateChanged(fecha: any) {
    this.dateValue = fecha;
    this.formattedString = format(parseISO(fecha), 'HH:mm,MMM d, yyyy');
    this.showPicker = false;
  }

  async cargarPaciente() {
    const indexValue = localStorage.getItem('indexValue');
    if (indexValue) {
      this.pacienteService.getPatientByID(indexValue).subscribe((patient) => {
        if (patient) {
          this.paciente = patient;
        }
      });
    }
  }

  fecha() {
    console.log(this.dateValue);
  }

  async saveCita() {
    if (this.citaForm.valid) {
      const cita: Cita = {idPaciente: this.paciente!.id, title: this.citaForm.value.descripcion, date: this.citaForm.value.fecha};
      this.citaService
        .saveCitasColeccion(cita)
        .then(async (result) => {
          if (result === 'success') {
            console.log('Cita guardado correctamente');
            const toast = await this.toastController.create({
              message: 'Cita guardado correctamente',
              duration: 2000, // Duración de 1.5 segundos
              position: 'top', // Posición superior
            });
            toast.present();
          } else {
            console.log('No se guardó la cita');
          }
        })
        .catch((error) => {
          console.log('Error');
        });
    } else {
      console.warn(
        'El formulario no es válido. Por favor, completa todos los campos requeridos.'
      );
    }
    //Limpiar el formulario
    this.citaForm.reset();
  }
}
