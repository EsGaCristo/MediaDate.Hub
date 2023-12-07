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

  updateCitasColeccion(cita: Cita): Promise<string> {
    return this.citasCollection
      .doc(cita.id)
      .update(cita)
      .then(() => {
        console.log('Cita actualizada');
        return 'success';
      })
      .catch((error) => {
        console.log('Error al actualizar la cita ' + error);
        return 'error';
      });
  }

  saveCitasColeccion(cita: Cita): Promise<string[]> {
    return this.citasCollection
      .add(cita)
      .then((doc) => {
        console.log('¡Cita añadida! - ' + doc.id);
        const ref = this.citasCollection.doc(doc.id);
        ref.update({ id: doc.id });
        return ['success', doc.id];
      })
      .catch((error) => {
        console.log('Error al añadir la cita :/ ' + error);
        return ['error', ''];
      });
  }

  
  

  async removeCitasColeccion(id: string): Promise<string> {
    console.log('el id de la cita es: ' + id);
    const documentRef = this.firestore.collection('citas').doc(id);
  
    return new Promise<string>(async (resolve, reject) => {
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
              resolve('cancelled');
            },
          },
          {
            text: 'Eliminar',
            handler: () => {
              documentRef
                .delete()
                .then(() => {
                  console.log('Cita eliminada' + id);
                  resolve('success');
                })
                .catch((error) => {
                  console.log('Error al eliminar la cita ' + error);
                  resolve('error');
                });
            },
          },
        ],
      });
  
      await alert.present();
    });
  }
  

}