import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { PacienteService } from '../services/paciente.service';
import { historialMedico } from '../models/historial.model';
import { Paciente } from '../models/paciente.model';

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.page.html',
  styleUrls: ['./patient-view.page.scss'],
})
export class PatientViewPage implements OnInit {
  public paciente?: Paciente;
  public historialMedicoArray:historialMedico[] = [];
  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService,
    private toastController: ToastController,
    private pacienteService: PacienteService
  ) {}

  ngOnInit() {
    this.loadPatiente();
  }
  async loadPatiente() {
    const indexValue = localStorage.getItem('indexValue');
    if (indexValue) {
      this.pacienteService.getPatientByID(indexValue).subscribe((patient) => {
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
  
  generarEnlaceWhatsApp() {
    const enlace = `http://localhost:8100/user-view?id=${this.paciente?.id}`;
    // Abre un enlace en una nueva pestaña del navegador
    window.open(`https://wa.me/?text=${encodeURIComponent(enlace)}`, '_blank');
  }

}
