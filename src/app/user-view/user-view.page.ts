<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
=======
import { Component, OnInit, ViewChild } from '@angular/core';
>>>>>>> test
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { PacienteService } from '../services/paciente.service';
import { historialMedico } from '../models/historial.model';
import { Paciente } from '../models/paciente.model';
<<<<<<< HEAD
=======
import { IonModal, Platform } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormBuilder, FormGroup, Form, Validators } from '@angular/forms';
import { IonTextarea } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
>>>>>>> test

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.page.html',
  styleUrls: ['./user-view.page.scss'],
})
export class UserViewPage implements OnInit {
<<<<<<< HEAD
  public paciente?: Paciente;
  public historialMedicoArray:historialMedico[] = [];

=======

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
  public descripcion: string = '';
  public enfermedad: string = '';
>>>>>>> test
  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService,
    private toastController: ToastController,
<<<<<<< HEAD
    private pacienteService: PacienteService) { }

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
  
    public agregarCita(): void {
      this.router.navigate(['/agregar-cita']);
    }
  
    public updatePatient(): void {
      this.router.navigate(['/patient-update']);
    }
  

=======
    private formBuilder: FormBuilder,
    private pacienteService: PacienteService,
    private route: ActivatedRoute
  ) {
    
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
    
    this.modal2.present();
  }

  @ViewChild('modal2') modal2!: IonModal;
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      //this.message = `Hello, ${ev.detail.data}!`;
    }
  }


  

  onWillDismiss2(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      //this.message = `Hello, ${ev.detail.data}!`;
    }
  }


  adjustTextarea(event: any): void {
    let textarea: any = event.target;
    textarea.style.overflow = 'hidden';
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    this.textareaHeight = textarea.style.height;
  }

>>>>>>> test
}
