import { Component,ViewChild } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/daygrid';

import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import esLocale from '@fullcalendar/core/locales/es';
import { FormBuilder, FormGroup, Form ,Validators} from '@angular/forms';
import { Cita } from '../models/cita.model';
import { CitaService } from '../services/cita.service';
import { th } from 'date-fns/locale';
import {format,parseISO} from 'date-fns';
import { co } from '@fullcalendar/core/internal-common';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{

  modes=['date','date-time','month','time','time-date','year'];
  selectedMode='date';
  showPicker=false;
  dateValue = format(new Date(),'yyyy-MM-dd')+'T09:00:00.000Z';
  formattedString = '';
  shouldReloadCalendar: boolean = false;
  public addCitaForm : FormGroup;
  cita: Cita;
  events: any[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    locale: esLocale,
    eventClick: this.handleDateClick.bind(this),
    //events: this.CitaService.getCitasEvent(),
    headerToolbar: {
      right: 'prev,next today',
      center: 'title',
      left: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    
  };

  handleDateClick(arg:any) {
    this.message = arg.event.title;
    this.buscarPaciente(arg.event.extendedProps.idPaciente);
    this.modal.present();
    //alert('date click! ' + arg.dateStr)
  }

  //////////////////////////MODAL//////////////////////////////
  @ViewChild('modal') modal!: IonModal;
  @ViewChild('modal2') modal2!: IonModal;
  public name: string= '';// Declaración de la propiedad 'name'
  public message: string= ''; // Declaración de la propiedad 'message'
  public paciente: string= ''; // Declaración de la propiedad 'paciente'
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      //this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  cancel2() {
    this.modal2.dismiss(null, 'cancel');
  }

  confirm2() {
    this.cita = {
      idPaciente: '1',
      title: this.addCitaForm.value.title,
      date: new Date(this.dateValue)
    }
    this.CitaService.addCita( this.cita);
    this.modal2.dismiss(this.name, 'confirm');
    //this.calendarOptions.events = this.CitaService.getCitasEvent();
  }

  onWillDismiss2(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      //this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  dateChanged (fecha: any){
    this.dateValue = fecha;
    this.formattedString = format(parseISO(fecha),'HH:mm,MMM d, yyyy');
    this.showPicker = false;
  }

  setToday(){
    this.formattedString = format(parseISO(format(new Date(),'yyyy-MM-dd')+'T09:00:00.000Z'),'HH:mm,MMM d, yyyy');
  }

  //////////////////////////ACCIONES//////////////////////////////

  constructor(private formBuilder:FormBuilder, private CitaService: CitaService, private pacienteService: PacienteService) {
    
    this.addCitaForm = this.formBuilder.group({
      title: ['',Validators.required],
      date:['']
    });
    //this.events = CitaService.getCitasEvent();
    console.log(this.events);
    this.cita = {
      idPaciente: '',
      title: '',
      date: new Date()
    }

    CitaService.getCitasColeccion().subscribe((citas) => {
      this.calendarOptions.events = citas;
      this.events = citas;
    });
  }

  async buscarPaciente(indexValue: string) {
    if (indexValue) {
      await this.pacienteService.getPatientByID(indexValue).subscribe((patient) => {
        if (patient) {
          this.paciente = patient.name;
          console.log(this.paciente);
        }
      });
    }
  }

}
