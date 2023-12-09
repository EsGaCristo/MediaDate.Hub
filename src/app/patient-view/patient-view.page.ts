import { Component, OnInit ,ViewChild} from '@angular/core';
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

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.page.html',
  styleUrls: ['./patient-view.page.scss'],
})
export class PatientViewPage implements OnInit {

  @ViewChild('enfermedadTextarea') enfermedadTextarea!: IonTextarea;
  public textareaHeight: string = 'auto';
  

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
  public yeet = 0;
  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService,
    private toastController: ToastController,
    private formBuilder: FormBuilder,
    private pacienteService: PacienteService
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
    const indexValue = localStorage.getItem('indexValue');
    if (indexValue) {
      this.pacienteService.getPatientByID(indexValue).subscribe((patient) => {
        if (patient) {
          this.paciente = patient;
          this.historialMedicoArray = patient.historialMedico;
          this.yeet = patient.cel;
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
  abrirModal( historia : historialMedico){
    this.historialMedico = historia;
    this.addCitaForm = this.formBuilder.group({
      enfermedad: [historia.enfermedad, Validators.required],
      descripcion: [historia.descripcion, Validators.required],
    });
    this.modal2.present();
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
  
  generarEnlaceWhatsApp() {
    const enlace = `localhost:8100/user-view?id=${this.paciente?.id}`;
    window.open(`https://wa.me/52${this.yeet}?text=${encodeURIComponent(enlace)}`, '_blank');
  }
 
}
