import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, addDoc } from '@angular/fire/firestore'; // Asegúrate de importar addDoc

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private medicosRef = collection(this.firestore, 'medicos');

  constructor(private firestore: Firestore) {}

  async obtenerMedicos(): Promise<any[]> {
    const snapshot = await getDocs(this.medicosRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  async agendarCita(cita: any): Promise<void> {
    const citasRef = collection(this.firestore, 'citas');
    await addDoc(citasRef, cita); // Asegúrate de que addDoc esté importada
  }
}