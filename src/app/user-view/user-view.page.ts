import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { PacienteService } from '../services/paciente.service';
import { historialMedico } from '../models/historial.model';
import { Paciente } from '../models/paciente.model';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.page.html',
  styleUrls: ['./user-view.page.scss'],
})
export class UserViewPage implements OnInit {
  public paciente?: Paciente;
  public historialMedicoArray:historialMedico[] = [];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService,
    private toastController: ToastController,
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
  

}
