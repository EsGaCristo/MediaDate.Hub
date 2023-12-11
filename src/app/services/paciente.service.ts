import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, map, of } from 'rxjs';
import { Paciente } from '../models/paciente.model';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentSnapshot,
} from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
import { historialMedico } from '../models/historial.model';
import { take } from 'rxjs/operators';
import { CitaService } from '../services/cita.service';
import { ToastController } from '@ionic/angular';



@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private pacientes: Observable<Paciente[]>;
  private pacienteCollection: AngularFirestoreCollection<Paciente>;

  constructor(
    private firestore: AngularFirestore,
    private alertController: AlertController,
    private citaService: CitaService,
    private toastController: ToastController
  ) {
    // REFERENCIA A COLECCION DE PACIENTES
    this.pacienteCollection = this.firestore.collection<Paciente>('pacientes');
    this.pacientes = this.pacienteCollection.valueChanges({ idField: 'id' });
  }

  getPatients(): Observable<Paciente[]> {
    return this.pacientes;
  }
  getPatientByID(index: string): Observable<Paciente | undefined> {
    return this.pacientes.pipe(
      map((pacientes) => pacientes.find((paciente) => paciente.id === index))
    );
  }

  savePatient(paciente: Paciente): Promise<string> {
    return this.pacienteCollection
      .add(paciente)
      .then((doc) => {
        console.log('¡Paciente añadido! - ' + doc.id);
        const ref = this.pacienteCollection.doc(doc.id);
        ref.update({ id: doc.id });
        return 'success';
      })
      .catch((error) => {
        console.log('Error al añadir el paciente :/ ' + error);
        return 'error';
      });
  }
  async updateDateByID(
    index: string,
    newDate: string,
    idCita?: string
  ): Promise<string> {
    const pacienteDoc = await firstValueFrom(
      await this.pacienteCollection.doc(index).get()
    );
    const historialMedico = pacienteDoc.get('historialMedico') || [];

    // Encontrar el índice del subdocumento con el idCita
    const citaIndex = historialMedico.findIndex(
      (cita: any) => cita.idCita === idCita
    );
    // Actualizar la fecha de la cita específica
    historialMedico[citaIndex].fecha = newDate;

    return await this.pacienteCollection
      .doc(index)
      .update({ historialMedico })
      .then((doc) => {
        console.log(`Cita de paciente ${index} actualida `);
        return 'success';
      })
      .catch((error) => {
        console.log(`Error al actualizar ${error}`);
        return 'error';
      });
  }
  async updatePatient(paciente: Paciente, id: string): Promise<string> {
    //console.log('el id del producto es: ' + paciente.id);
    return this.pacienteCollection
      .doc(id)
      .update({
        name: paciente.name,
        age: paciente.age,
        cel: paciente.cel,
        description: paciente.description,
        tipoSangre: paciente.tipoSangre,
        alergias: paciente.alergias,
      })
      .then((doc) => {
        console.log('Paciente actualizado ' + paciente.id);
        return 'success';
      })
      .catch((error) => {
        console.log('Error al actualizar el paciente' + error);
        return 'error';
      });
  }

  async removePatient(id: string): Promise<string> {
    console.log('el id del paciente es: ' + id);
    const documentRef = this.firestore.collection('pacientes').doc(id);
    let yeet: string = 'mojarra';
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que quieres eliminar este paciente?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // No elimina el paciente
          },
        },
        {
          text: 'Eliminar',
          handler: () => {
            return documentRef
              .delete()
              .then(async (doc) => {
                const result2 = await this.citaService.eliminarCitaPorIdPaciente(id);
                if(result2 === 'success'){
                  console.log("Citas eliminadas correctamente");
                }
                const toast = await this.toastController.create({
                  message: 'Paciente eliminado correctamente',
                  duration: 2000,
                  position: 'top'
                });
          
                toast.present();
          
                await toast.onDidDismiss(); // Esp
                console.log('Producto eliminado' + id);
                yeet = 'success';
              })
              .catch((error) => {
                console.log('Error al eliminar el producto ' + error);
                yeet = 'error';
              });
          },
        },
      ],
    });
    await alert.present();
    return yeet;
  }

  async addHistorial(historial: historialMedico, id: string): Promise<string> {
    this.pacienteCollection
      .doc(id)
      .get()
      .subscribe((doc) => {
        if (doc.exists) {
          let historialArray: historialMedico[] = doc.data()!.historialMedico;
          historialArray.push(historial);
          this.pacienteCollection
            .doc(id)
            .update({ historialMedico: historialArray });
        }
      });
    return 'success';
  }

  async updateHistorial(
    historial: historialMedico,
    id: string
  ): Promise<string> {
    this.pacienteCollection
      .doc(id)
      .get()
      .subscribe((doc) => {
        if (doc.exists) {
          let historialArray: historialMedico[] = doc.data()!.historialMedico;
          for (let i = 0; i < historialArray.length; i++) {
            if (historialArray[i].idCita == historial.idCita) {
              historialArray[i] = historial;
            }
          }
          this.pacienteCollection
            .doc(id)
            .update({ historialMedico: historialArray });
        }
      });
    return 'success';
  }
}
