import { Injectable } from '@angular/core';
import { Cita } from '../models/cita.model';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private citas: Cita[] = [];

  constructor() {
    this.citas.push({
      title: "Ir por Cafe",
      date: new Date('2023-11-15T12:00:00')
    });
    this.citas.push({
      title: "Dormir",
      date: new Date('2023-11-28T12:00:00')
    });
    this.citas.push({
      title: "comer",
      date: new Date('2023-11-29T12:00:00')
    });
    this.citas.push({
      title: "salir",
      date: new Date('2023-12-01T12:00:00')
    });
    this.citas.push({
      title: "Ir a la escuela",
      date: new Date('2023-12-01T12:00:00')
    });
    this.citas.push({
      title: "nose",
      date: new Date('2023-12-01T12:00:00')
    });
  }

  getCitas(): Cita[] {
    return this.citas;
  }
  getCitasEvent(): any[] {
    // Transforma las citas al formato deseado
    return this.citas.map(cita => {
      return { title: cita.title, date: cita.date };
    });
  }

  addCita(cita: Cita) {
    console.log(cita);
    this.citas.push(cita);
    console.log(this.citas.length);
    console.log(this.citas);
  }
}
