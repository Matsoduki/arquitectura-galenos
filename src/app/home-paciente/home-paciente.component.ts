import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { PacienteService } from '../services/paciente.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home-paciente',
  templateUrl: './home-paciente.component.html',
  styleUrls: ['./home-paciente.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class HomePacienteComponent implements OnInit {
  user: any = null; // Información del paciente
  loading: boolean = true; // Estado de carga

  constructor(
    private authService: AuthService,
    private router: Router,
    private pacienteService: PacienteService
  ) {}

  ngOnInit() {
    this.getUserDetails(); // Cargar los detalles del usuario al iniciar el componente
  }

  async getUserDetails() {
    const userId = this.authService.getCurrentUserId(); // Obtener el ID del usuario actual
    if (userId) {
      try {
        const pacientes = await this.pacienteService.obtenerPacientes(); // Obtener todos los pacientes
        this.user = pacientes.find(paciente => paciente.userId === userId); // Buscar el paciente correspondiente

        if (this.user) {
          console.log('Datos del usuario:', this.user);
        } else {
          console.warn('No se encontró un paciente con ese ID.');
        }
      } catch (error) {
        console.error('Error al obtener datos del paciente:', error);
      } finally {
        this.loading = false; // Ocultar el estado de carga
      }
    } else {
      console.warn('No hay usuario autenticado');
      this.loading = false; // Ocultar el estado de carga si no hay ID
    }
  }

  logout() {
    this.authService.logout(); // Lógica para cerrar sesión
    this.router.navigate(['/login']); // Redirigir al login
  }

  navigateToAgendarCita() {
    this.router.navigate(['/agendar-cita']);
  }

  navigateToPerfil() {
    this.router.navigate(['/perfil']); // Navega a la página de perfil
  }

}