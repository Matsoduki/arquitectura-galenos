import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, deleteDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Paciente } from '../models/paciente.model';
import { AuthService } from './auth.service'; // Importar AuthService

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private pacientesRef = collection(this.firestore, 'pacientes');

  constructor(private firestore: Firestore, private authService: AuthService) {}

  // Agregar un nuevo paciente
  async agregarPaciente(paciente: Paciente): Promise<string> {
    const userId = this.authService.getCurrentUserId(); // Obtener el userId del usuario autenticado
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

  // Actualizar un paciente
  async actualizarPaciente(paciente: Paciente): Promise<void> {
    if (!paciente.id) {
      throw new Error('El paciente no tiene un ID definido.'); // Verifica que el ID esté definido
    }
    const pacienteDoc = doc(this.firestore, 'pacientes', paciente.id); // Asegúrate de que el paciente tenga un `id`
    await updateDoc(pacienteDoc, { // Actualiza los campos deseados
      nombre: paciente.nombre,
      apellido: paciente.apellido,
      email: paciente.email,
      telefono: paciente.telefono,
      direccion: paciente.direccion,
      fechaNacimiento: paciente.fechaNacimiento
    });
  }
}