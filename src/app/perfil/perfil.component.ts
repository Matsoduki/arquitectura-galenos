import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PacienteService } from '../services/paciente.service';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  imports: [IonicModule, FormsModule, CommonModule],
})
export class PerfilComponent implements OnInit {
  user: any; // Información del paciente
  loading: boolean = true; // Estado de carga
  errorMessage: string = ''; // Mensaje de error

  constructor(
    private authService: AuthService,
    private pacienteService: PacienteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUserDetails(); // Cargar detalles del usuario
  }

  async loadUserDetails() {
    const userId = this.authService.getCurrentUserId(); // Obtener el ID del usuario actual
    if (userId) {
      try {
        const pacientes = await this.pacienteService.obtenerPacientes(); // Obtener todos los pacientes
        this.user = pacientes.find(paciente => paciente.userId === userId); // Buscar el paciente correspondiente

        if (this.user) {
          console.log('Datos del usuario:', this.user);
        } else {
          console.warn('No se encontró un paciente con ese ID.');
          this.errorMessage = 'No se encontró un paciente con ese ID.';
        }
      } catch (error) {
        console.error('Error al obtener datos del paciente:', error);
        this.errorMessage = 'Error al cargar los datos del perfil.';
      } finally {
        this.loading = false; // Ocultar el estado de carga
      }
    } else {
      console.warn('No hay usuario autenticado');
      this.router.navigate(['/login']); // Redirigir si no hay usuario autenticado
      this.loading = false; // Ocultar el estado de carga si no hay ID
    }
  }

  async updateProfile() {
    if (this.user) {
      try {
        await this.pacienteService.actualizarPaciente(this.user); // Actualizar los datos del paciente
        alert('Perfil actualizado exitosamente');
      } catch (error) {
        console.error('Error al actualizar el perfil:', error);
        alert('No se pudo actualizar el perfil. Inténtalo de nuevo.');
      }
    } else {
      alert('No se pudieron cargar los datos del perfil.');
    }
  }
}