import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, deleteDoc, doc, getDoc } from '@angular/fire/firestore';
import { Paciente } from '../models/paciente.model';
import { AuthService } from './auth.service'; // Importar AuthService

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private pacientesRef = collection(this.firestore, 'pacientes');

  constructor(private firestore: Firestore, private authService: AuthService) {} // Inyectar AuthService

  // Agregar un nuevo paciente
  async agregarPaciente(paciente: Paciente): Promise<string> {
    // Obtener el userId del usuario autenticado y agregarlo al paciente
    const userId = this.authService.getCurrentUserId();
    const docRef = await addDoc(this.pacientesRef, { ...paciente, userId });
    return docRef.id; // Devuelve el ID del nuevo paciente
  }

  // Obtener todos los pacientes
  async obtenerPacientes(): Promise<Paciente[]> {
    const snapshot = await getDocs(this.pacientesRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Paciente[];
  }

  // Obtener un paciente por ID
  async obtenerPacientePorId(id: string): Promise<Paciente | null> {
    const pacienteDoc = doc(this.firestore, 'pacientes', id);
    const docSnap = await getDoc(pacienteDoc);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Paciente : null;
  }

  // Eliminar un paciente
  async eliminarPaciente(id: string): Promise<void> {
    const pacienteDoc = doc(this.firestore, 'pacientes', id);
    await deleteDoc(pacienteDoc); // Elimina el documento del paciente
  }
}