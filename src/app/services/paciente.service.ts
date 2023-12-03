import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Paciente } from '../models/paciente.model';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentSnapshot,
} from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private pacientes: Observable<Paciente[]>;
  private pacienteCollection: AngularFirestoreCollection<Paciente>;

  constructor(
    private firestore: AngularFirestore,
    private alertController: AlertController
  ) {
    // REFERENCIA A COLECCION DE PACIENTES
    this.pacienteCollection = this.firestore.collection<Paciente>('pacientes');
    this.pacientes = this.pacienteCollection.valueChanges({idField:'id'});
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
              .then((doc) => {
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
}
