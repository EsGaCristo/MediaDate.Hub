import { Component, OnInit } from '@angular/core';
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
  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService,
    private toastController: ToastController,
    private formBuilder: FormBuilder,
    private pacienteService: PacienteService,
    private route: ActivatedRoute
  ) {
    
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


  adjustTextarea(event: any): void {
    let textarea: any = event.target;
    textarea.style.overflow = 'hidden';
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    this.textareaHeight = textarea.style.height;
  }

}
