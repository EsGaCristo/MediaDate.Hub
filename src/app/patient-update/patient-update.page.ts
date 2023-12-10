import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import {format,parseISO} from 'date-fns';
import { PacienteService } from '../services/paciente.service';
import { ToastController } from '@ionic/angular';
import { Paciente } from '../models/paciente.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-patient-update',
  templateUrl: './patient-update.page.html',
  styleUrls: ['./patient-update.page.scss'],
})
export class PatientUpdatePage implements OnInit {
  productForm:FormGroup;
  modes=['date','date-time','month','time','time-date','year'];
  selectedMode='date';
  showPicker=false;
  dateValue = format(new Date(),'yyyy-MM-dd')+'T09:00:00.000Z';
  formattedString = '';
  public paciente?: Paciente;
  madafaker = "HxfEwf1cIJgFXFzs8m5g";

  constructor(private formBuilder:FormBuilder, private pacienteService: PacienteService,
    private toastController: ToastController, private router: Router,
    private route: ActivatedRoute) {

    this.setToday();
    //inicializar el formulario
    this.productForm=this.formBuilder.group({
    name:[this.paciente?.name,Validators.required],
    age:[null,Validators.required],
    cel:[null,Validators.required],
    description:[''],
    tipoSangre:['',Validators.required],
    alergias:[''],
    historialMedico:[[]],
      });

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
            this.madafaker = indexValue;
            this.productForm.patchValue({
              id:indexValue,
              name: this.paciente.name,
              age : this.paciente.age,
              cel: this.paciente.cel,
              description: this.paciente.description,
              tipoSangre: this.paciente.tipoSangre,
              alergias: this.paciente.alergias,
              historialMedico: this.paciente.historialMedico
            });
          }
        });
      }
    }

    setToday(){
      this.formattedString = format(parseISO(format(new Date(),'yyyy-MM-dd')+'T09:00:00.000Z'),'HH:mm,MMM d, yyyy');
    }

    /* dateChanged (value) {
      console.log(value);
      this.formattedString = format(parseISO(value),'HH:mm,MM dd, yyyy');
    } */

    dateChanged (fecha: any){
      this.dateValue = fecha;
      this.formattedString = format(parseISO(fecha),'HH:mm,MMM d, yyyy');
      this.showPicker = false;
    }

    // FUNCIONES
    async updatePatient() {
      if (this.productForm.valid) {
        const paciente = this.productForm.value;
       this.pacienteService.updatePatient(paciente, this.madafaker)
       .then(async (result)=>{
        if(result === 'success'){
          console.log("Paciente actualizado correctamente");
          const toast = await this.toastController.create({
            message: 'Paciente actualizado correctamente',
            duration: 2000, // Duración de 1.5 segundos
            position: 'top' // Posición superior
          });
          toast.present();
        }else{
          console.log("No sirve");
        }
       })
       .catch((error)=>{
        console.log("Error");
       });
      } else {
        console.warn('El formulario no es válido. Por favor, completa todos los campos requeridos.');
      }
      //Limpiar el formulario
      this.productForm.reset();

      this.router.navigate(['/tabs/tab1']);
    }

    async deletePatient(id: string) {
      try {
        const result = await this.pacienteService.removePatient(id);
    
        if (result === 'success') {
          console.log("Paciente eliminado correctamente");
          
          const toast = await this.toastController.create({
            message: 'Paciente eliminado correctamente',
            duration: 2000,
            position: 'top'
          });
    
          toast.present();
    
          await toast.onDidDismiss(); // Esperar a que se cierre el Toast antes de continuar
        } else {
          console.log("No sirve");
        }
        this.router.navigate(['/tabs/tab1']);
      } catch (error) {
        console.log("Error", error);
      }
    }
    
    


    
}
