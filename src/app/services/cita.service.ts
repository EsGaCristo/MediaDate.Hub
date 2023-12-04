import { Injectable } from '@angular/core';
import { Cita } from '../models/cita.model';
import { Observable, map} from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
import { C } from '@fullcalendar/core/internal-common';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private citas: Cita[] = [];

  private citas2: Observable<Cita[]>;
  private citasCollection: AngularFirestoreCollection<Cita>;

  constructor( private firestore: AngularFirestore, private alertController: AlertController) {
    this.citas.push({
      idPaciente: "sMbc9wYGY1TL1Ihnyt6j",
      title: "Ir por Cafe",
      date: new Date('2023-11-15T12:00:00')
    });
    this.citas.push({
      idPaciente: "sMbc9wYGY1TL1Ihnyt6j",
      title: "Dormir",
      date: new Date('2023-11-28T12:00:00')
    });
    this.citas.push({
      idPaciente: "sMbc9wYGY1TL1Ihnyt6j",
      title: "comer",
      date: new Date('2023-11-29T12:00:00')
    });
    this.citas.push({
      idPaciente: "sMbc9wYGY1TL1Ihnyt6j",
      title: "salir",
      date: new Date('2023-12-01T12:00:00')
    });
    this.citas.push({
      idPaciente: "sMbc9wYGY1TL1Ihnyt6j",
      title: "Ir a la escuela",
      date: new Date('2023-12-01T12:00:00')
    });
    this.citas.push({
      idPaciente: "sMbc9wYGY1TL1Ihnyt6j",
      title: "nose",
      date: new Date('2023-12-01T12:00:00')
    });

    // REFERENCIA A COLECCION DE CITAS
    this.citasCollection = this.firestore.collection<Cita>('citas');
    this.citas2 = this.citasCollection.valueChanges({idField:'id'});
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


  getCitasColeccion(): Observable<Cita[]> {
    return this.citas2;
  }
  getCitasColeccionById(index: string): Observable<Cita | undefined> {
    return this.citas2.pipe(
      map((citas2) => citas2.find((cita) => cita.id === index))
    );
  }

  saveCitasColeccion(cita: Cita): Promise<string> {
    return this.citasCollection
      .add(cita)
      .then((doc) => {
        console.log('¡Cita añadida! - ' + doc.id);
        const ref = this.citasCollection.doc(doc.id);
        ref.update({ id: doc.id });
        return 'success';
      })
      .catch((error) => {
        console.log('Error al añadir la cita :/ ' + error);
        return 'error';
      });
  }

  async removeCitasColeccion(id: string): Promise<string> {
    console.log('el id de la cita es: ' + id);
    const documentRef = this.firestore.collection('citas').doc(id);
    let yeet: string = '';
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que quieres eliminar esta cita?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // No elimina la cita
          },
        },
        {
          text: 'Eliminar',
          handler: () => {
            return documentRef
              .delete()
              .then((doc) => {
                console.log('Cita eliminada' + id);
                yeet = 'success';
              })
              .catch((error) => {
                console.log('Error al eliminar la cita ' + error);
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
