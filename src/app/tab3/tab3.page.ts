import { Component, ViewChild } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/daygrid';
import { IonModal, Platform } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import esLocale from '@fullcalendar/core/locales/es';
import { FormBuilder, FormGroup, Form, Validators } from '@angular/forms';
import { Cita } from '../models/cita.model';
import { CitaService } from '../services/cita.service';
import { th } from 'date-fns/locale';
import { format, parseISO } from 'date-fns';
import { co } from '@fullcalendar/core/internal-common';
import { PacienteService } from '../services/paciente.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  modes = ['date', 'date-time', 'month', 'time', 'time-date', 'year'];
  selectedMode = 'date';
  showPicker = false;
  dateValue = format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z';
  formattedString = '';
  shouldReloadCalendar: boolean = false;
  public addCitaForm: FormGroup;
  cita: Cita;
  events: any[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    locale: esLocale,
    eventClick: this.handleDateClick.bind(this),
    headerToolbar: {
      right: 'prev,next today',
      center: 'title',
      left: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
  };

  handleDateClick(arg: any) {
    this.cita = {
      id: arg.event.extendedProps.idCita,
      idPaciente: arg.event.extendedProps.idPaciente,
      title: arg.event.title,
      date: arg.event.fecha,
    };

    this.descripcion = arg.event.extendedProps.descripcion;
    this.buscarPaciente(arg.event.extendedProps.idPaciente);
    this.dateValue = arg.event.extendedProps.fecha;
    this.fecha = new Date(arg.event.extendedProps.fecha);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    const formatoFecha = new Intl.DateTimeFormat('es-ES', options);
    this.fechaFormateada = formatoFecha.format(this.fecha);
    this.modal.present();
    //alert('date click! ' + arg.dateStr)
  }

  //////////////////////////MODAL//////////////////////////////
  @ViewChild('modal') modal!: IonModal;
  @ViewChild('modal2') modal2!: IonModal;
  public name: string = ''; // Declaración de la propiedad 'name'
  public descripcion: string = ''; // Declaración de la propiedad 'message'
  public paciente: string = ''; // Declaración de la propiedad 'paciente'
  public fecha: Date = new Date(); // Declaración de la propiedad 'date'
  public fechaFormateada: string = ''; // Declaración de la propiedad 'date'
  public numero: string = ''; // Declaración de la propiedad 'numero'
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  actualizarFormulario(){
    console.log(this.dateValue);
    this.cargarFormulario();
    this.modal2.present();
  }

  async eliminar() {
    console.log(this.cita.id);
    this.CitaService.removeCitasColeccion(this.cita.id!).then((result) => {
      if (result === 'success') {
        this.modal.dismiss(this.name, 'confirm');
        this.shouldReloadCalendar = true;
        this.calendarOptions.events = [];
        this.events = [];
        this.cargarCitas();
      }
    });
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
    this.cita.title = this.addCitaForm.value.title;
    console.log(new Date(this.formattedString));
    this.cita.date = new Date(this.formattedString);
   
    this.CitaService.updateCitasColeccion(this.cita).then((result) => {
      if (result === 'success') {
        this.modal2.dismiss(this.name, 'confirm');
        this.shouldReloadCalendar = true;
        this.calendarOptions.events = [];
        this.events = [];
        this.cargarCitas();
      }
    }); 
    //this.modal2.dismiss(this.name, 'confirm');
  }

  onWillDismiss2(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      //this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  dateChanged(fecha: any) {
    this.dateValue = fecha;
    this.formattedString = format(parseISO(fecha), 'HH:mm,MMM d, yyyy');
    console.log(this.formattedString);
    this.showPicker = false;
  }

  //////////////////////////ACCIONES//////////////////////////////

  constructor(
    private formBuilder: FormBuilder,
    private CitaService: CitaService,
    private pacienteService: PacienteService,
    private platform: Platform
  ) {
    this.addCitaForm = this.formBuilder.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
    });
    this.cita = {
      idPaciente: '',
      title: '',
      date: new Date(),
    };

    this.cargarCitas();
  }

  cargarCitas() {
    this.CitaService.getCitasColeccion().subscribe((citas) => {
      let counter = 0;

      citas.map((cita) => {
        this.pacienteService
          .getPatientByID(cita.idPaciente)
          .subscribe((paciente) => {
            if (paciente) {
              const fechaFormateada = this.convertirFecha(cita.date);
              this.events.push({
                title: paciente.name,
                date: fechaFormateada,
                fecha:fechaFormateada,
                idPaciente: cita.idPaciente,
                descripcion: cita.title,
                idCita: cita.id,
              });
            }
            counter++;
            const fechaFormateada = this.convertirFecha(cita.date);
            if (counter === citas.length) {
              const datos = this.events.map((cita) => ({
                title: fechaFormateada,
                date:fechaFormateada,
                fecha: cita.fecha,
                idPaciente: cita.idPaciente,
                descripcion: cita.descripcion,
                idCita: cita.idCita,
              }));

              this.calendarOptions.events = this.events;
              this.events = citas;
            }
          });
      });
    });
  }

  convertirFecha(timestamp: any): Date {
    return timestamp.toDate();
  }

  cargarFormulario(){
   
    this.addCitaForm = this.formBuilder.group({
      title: [this.descripcion, Validators.required],
      date: [this.fecha, Validators.required],
    });
  }

  async buscarPaciente(indexValue: string) {
    if (indexValue) {
      await this.pacienteService
        .getPatientByID(indexValue)
        .subscribe((patient) => {
          if (patient) {
            this.paciente = patient.name;
            this.numero = patient.cel.toString();
          }
        });
    }
  }


  abrirEnlace() {
    console.log(this.paciente);
    console.log(this.fechaFormateada);
    console.log(this.descripcion);
    console.log(this.numero);
    
    const paciente = encodeURIComponent(this.paciente);
    const fechaFormateada = encodeURIComponent(this.fechaFormateada);
    const descripcion = encodeURIComponent(this.descripcion);
    const numero = encodeURIComponent(this.numero);

      const mensaje = `Hola ${paciente} 🙌 ...\nEsperando que te encuentres bien, quiero informarte que tienes una cita en nuestra clínica 🏥 para el día y hora ${fechaFormateada}, por razones de ${descripcion}😷, sin más por el momento te esperamos`;

      const enlace = `https://wa.me/52${numero}?text=${mensaje}`;
    window.open(enlace, '_blank');
  }


  formatoFecha(fecha: string): string {
    const fechaObjeto = new Date(fecha);
    const dia = fechaObjeto.getDate();
    const mes = fechaObjeto.getMonth() + 1; // Los meses en JavaScript son 0 indexados
    const anio = fechaObjeto.getFullYear();
    const horas = fechaObjeto.getHours();
    const minutos = fechaObjeto.getMinutes();

    // Agregar ceros a la izquierda si es necesario
    const diaStr = dia < 10 ? `0${dia}` : dia;
    const mesStr = mes < 10 ? `0${mes}` : mes;
    const horasStr = horas < 10 ? `0${horas}` : horas;
    const minutosStr = minutos < 10 ? `0${minutos}` : minutos;

    // Formato final: DD/MM/YYYY, HH:mm
    return `${diaStr}/${mesStr}/${anio}, ${horasStr}:${minutosStr}`;
  }

  
}
