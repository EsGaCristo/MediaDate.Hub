import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { PacienteService } from '../services/paciente.service';
import { historialMedico } from '../models/historial.model';
import { Paciente } from '../models/paciente.model';
import { IonModal, Platform } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormBuilder, FormGroup, Form, Validators } from '@angular/forms';
import { IonTextarea } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.page.html',
  styleUrls: ['./user-view.page.scss'],
})
export class UserViewPage implements OnInit {

  @ViewChild('enfermedadTextarea') enfermedadTextarea!: IonTextarea;
 
  public textareaHeight: string = 'auto';
  public guajolota = '';

  public paciente?: Paciente;
  public historialMedicoArray:historialMedico[] = [];
  public historialMedico : historialMedico = {
    idCita : "",
    fecha : new Date(),
    enfermedad : "",
    descripcion : ""
  };
  public addCitaForm: FormGroup;
  public descripcion: string = '';
  public enfermedad: string = '';
  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService,
    private toastController: ToastController,
    private formBuilder: FormBuilder,
    private pacienteService: PacienteService,
    private route: ActivatedRoute
  ) {
    this.addCitaForm = this.formBuilder.group({
      enfermedad: [this.enfermedad, Validators.required],
      descripcion: [this.enfermedad, Validators.required],
    });
  }
  public handleDateClick(arg: any) {
    this.modal2.present();
    //alert('date click! ' + arg.dateStr)
  }

  ngOnInit() {
    this.loadPatiente();
  }
  async loadPatiente() {
    const urlParams = new URLSearchParams(window.location.search);
    const patientId = urlParams.get('id');
  
    if (patientId) {
      this.pacienteService.getPatientByID(patientId).subscribe((patient) => {
        if (patient) {
          this.paciente = patient;
          this.historialMedicoArray = patient.historialMedico;
        }
      });
    }
  }

  convertirFecha(timestamp: any): Date {
    return timestamp.toDate();
  }


  abrirModal( historia : historialMedico){
    this.historialMedico = historia;
    this.addCitaForm = this.formBuilder.group({
      enfermedad: [historia.enfermedad, Validators.required],
      descripcion: [historia.descripcion, Validators.required],
    });
    this.modal2.present();
  }

  @ViewChild('modal2') modal2!: IonModal;
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      //this.message = `Hello, ${ev.detail.data}!`;
    }
  }
  
  cancel2() {
    this.modal2.dismiss(null, 'cancel');
  }

  onWillDismiss2(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      //this.message = `Hello, ${ev.detail.data}!`;
    }
  }
  confirm2() {
    this.historialMedico.enfermedad = this.addCitaForm.value.enfermedad;
    this.historialMedico.descripcion = this.addCitaForm.value.descripcion;

    this.pacienteService.updateHistorial(this.historialMedico, this.paciente!.id).then(async (result)  => {
      if (result === 'success') {
        const toast = await this.toastController.create({
          message: 'Prescripcion Actualizada',
          duration: 2000, // Duración de 1.5 segundos
          position: 'top', // Posición superior
        });
        toast.present();
      }
    });

    this.modal2.dismiss(null, 'cancel');
  }

  adjustTextarea(event: any): void {
    let textarea: any = event.target;
    textarea.style.overflow = 'hidden';
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    this.textareaHeight = textarea.style.height;
  }

  
}
