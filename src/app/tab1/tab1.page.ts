import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IonInput } from '@ionic/angular';
import { Paciente } from '../models/paciente.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  public data: Paciente[] = [
    { id: 1, name: 'John Doe', edad: 25, suffering: 'Dolor de Espalda', date: new Date('2023-11-06T09:00:00') },
    { id: 2, name: 'Alice Smith', edad: 30, suffering: 'Dolor de Cabeza', date: new Date('2023-11-07T10:00:00') },
    { id: 3, name: 'Carlos Pérez', edad: 40, suffering: 'Fiebre', date: new Date('2023-11-08T11:00:00') },
    { id: 4, name: 'Ana Gómez', edad: 35, suffering: 'Problemas Estomacales', date: new Date('2023-11-09T12:00:00') },
    { id: 5, name: 'Javier López', edad: 28, suffering: 'Migraña', date: new Date('2023-11-10T13:00:00') },
    
  ];

  public results: Paciente[] = [...this.data];

  handleInput(event: any) {
    const inputValue = event.target.value;

    if (inputValue && inputValue.trim() !== '') {
      const query = inputValue.toLowerCase();

      this.results = this.data.filter((paciente) =>
        paciente.name.toLowerCase().includes(query) ||
        String(paciente.edad).includes(query) ||
        paciente.date.toISOString().includes(query)
      );
    } else {
      // Si el valor es nulo, undefined o una cadena vacía, restaura al estado original
      this.results = [...this.data];
    }
  }

  constructor(private router: Router, private authService: AuthService) {}

  public viewPatient():void{
    localStorage.setItem('indexValue','sMbc9wYGY1TL1Ihnyt6jgit');
    this.router.navigate(['/patient-view']);
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
