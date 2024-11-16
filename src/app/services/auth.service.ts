import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null; // Almacena el usuario actual

  constructor(private auth: Auth) {
    // Observa el estado de autenticación
    onAuthStateChanged(this.auth, user => {
      this.currentUser = user; // Guarda el usuario autenticado
    });
  }

  // Método genérico de login
  async login(email: string, password: string): Promise<boolean> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      return true; // Login exitoso
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return false; // Login fallido
    }
  }

  // Método específico para login de médicos
  async loginMedico(email: string, password: string): Promise<boolean> {
    // Aquí podrías agregar lógica adicional para verificar si el usuario es un médico
    return this.login(email, password); // Reutiliza el método de login
  }

  async register(email: string, password: string): Promise<boolean> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      return true; // Registro exitoso
    } catch (error) {
      console.error('Error al registrar:', error);
      return false; // Registro fallido
    }
  }

  logout() {
    this.auth.signOut(); // Cerrar sesión
    this.currentUser = null; // Limpiar el usuario actual
  }

  // Método para obtener el ID del usuario actual
  getCurrentUserId(): string | null {
    return this.currentUser ? this.currentUser.uid : null;
  }

  // Método para obtener el usuario actual
  getCurrentUser(): User | null {
    return this.currentUser;
  }
}