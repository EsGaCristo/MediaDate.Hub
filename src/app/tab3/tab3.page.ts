import { Component,ViewChild  } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    eventClick: this.handleDateClick.bind(this),
    events: [
      { title: 'Ir por Cafe', date: new Date('2023-11-28T12:00:00') },
      { title: 'Dormir', date: new Date('2023-11-28T12:00:00')  },
      {title: 'comer', date: new Date('2023-12-01T12:00:00') },
      { title: 'salir', date: new Date('2023-12-01T12:00:00') },
      { title: 'Ir a la escuela', date: new Date('2023-12-01T12:00:00')},
      { title: 'nose', date: new Date('2023-12-01T12:00:00') }
    
    ]
  };

  handleDateClick(arg:any) {
    this.message = arg.event.title;
    this.modal.present();
    //alert('date click! ' + arg.dateStr)
    
  }

  //////////////////////////MODAL//////////////////////////////
  @ViewChild(IonModal) modal!: IonModal;
  public name: string= '';// Declaración de la propiedad 'name'
  public message: string= ''; // Declaración de la propiedad 'message'
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

  constructor() {}

}
