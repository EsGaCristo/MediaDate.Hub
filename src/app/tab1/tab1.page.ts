import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IonInput } from '@ionic/angular';
import { Paciente } from '../models/paciente.model';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  public data: Paciente[] = [
  ];

  public results: Paciente[] = [...this.data];

  handleInput(event: any) {
    const inputValue = event.target.value;

    if (inputValue && inputValue.trim() !== '') {
      const query = inputValue.toLowerCase();

      this.results = this.data.filter(
        (paciente) =>
          paciente.name.toLowerCase().includes(query)  
      );
    } else {
      // Si el valor es nulo, undefined o una cadena vacía, restaura al estado original
      this.results = [...this.data];
    }
  }

  constructor(private router: Router, private authService: AuthService, private pacienteService: PacienteService) {
    this.pacienteService.getPatients().subscribe((data) => {
      this.data = data;
      this.results = [...this.data];
    });
  }

  public viewPatient( idpa : string ): void {
    localStorage.setItem('indexValue', idpa);
    this.router.navigate(['/patient-view']);
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
