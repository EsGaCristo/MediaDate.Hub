import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import {format,parseISO} from 'date-fns';
import { PacienteService } from '../services/paciente.service';
import { ToastController } from '@ionic/angular';
import { th } from 'date-fns/locale';
import { co } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  productForm:FormGroup;
  modes=['date','date-time','month','time','time-date','year'];
  selectedMode='date';
  showPicker=false;
  dateValue = format(new Date(),'yyyy-MM-dd')+'T09:00:00.000Z';
  formattedString = '';

  constructor(private formBuilder:FormBuilder, private pacienteService: PacienteService,
    private toastController: ToastController) {

    this.setToday();
    //inicializar el formulario
    this.productForm=this.formBuilder.group({
    name:['',Validators.required],
    age:[null,Validators.required],
    cel:[null,Validators.required],
    description:[''],
    alergias:[''],
    fecha:['',Validators.required],
    historialMedico:[[]],
    tipoSangre:['',Validators.required]
      });

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
    async savePatient() {
      if (this.productForm.valid) {

      const paciente = this.productForm.value;
      
      paciente.date = new Date(this.productForm.value.fecha);
          
       this.pacienteService.savePatient(paciente)
       .then(async (result)=>{
        if(result === 'success'){
          console.log("Paciente guardado correctamente");
          const toast = await this.toastController.create({
            message: 'Paciente guardado correctamente',
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
    }

}