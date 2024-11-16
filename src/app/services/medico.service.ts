import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs } from '@angular/fire/firestore';
import { Medico } from '../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private medicosRef = collection(this.firestore, 'medicos'); // Referencia a la colección de médicos

  constructor(private firestore: Firestore) {}

  // Método para verificar si el RUT ya existe
  async existeRut(rut: string): Promise<boolean> {
    const q = query(this.medicosRef, where('rut', '==', rut));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // Retorna true si ya existe un médico con el mismo RUT
  }

  // Método para registrar un médico
  async registrarMedico(medico: Medico): Promise<string> {
    try {
      // Verificar si el RUT ya está registrado
      if (await this.existeRut(medico.rut)) {
        throw new Error('Ya existe un médico registrado con ese RUT.');
      }

      // Agrega el médico a la colección en Firestore
      const docRef = await addDoc(this.medicosRef, {
        rut: medico.rut,
        nombre: medico.nombre,
        apellido: medico.apellido,
        especialidad: medico.especialidad,
        claveSecreta: medico.claveSecreta,
        correo: medico.correo // Asegúrate de incluir el correo
      });

      return docRef.id; // Devuelve el ID del médico registrado
    } catch (error) {
      console.error('Error al registrar médico en Firestore:', error);
      throw new Error('Error al registrar médico. Inténtalo de nuevo más tarde.');
    }
  }
}