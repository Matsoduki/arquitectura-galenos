import { Component } from '@angular/core';
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
export class HomePacienteComponent {
  user: any = null; // Aquí almacenarás la información del paciente
  loading: boolean = true; // Para mostrar un estado de carga

  constructor(
    private authService: AuthService,
    private router: Router,
    private pacienteService: PacienteService
  ) {
    this.getUserDetails();
  }

  async getUserDetails() {
    const userId = this.authService.getCurrentUserId(); // Obtener el ID del usuario actual
    if (userId) {
      try {
        this.user = await this.pacienteService.obtenerPacientePorId(userId); // Obtener datos del paciente por ID
        if (this.user) {
          console.log('Datos del usuario:', this.user); // Verifica que el usuario se carga correctamente
        } else {
          console.warn('No se encontró un paciente con ese ID.');
        }
      } catch (error) {
        console.error('Error al obtener datos del paciente:', error);
      } finally {
        this.loading = false; // Ocultar el estado de carga
      }
    } else {
      console.warn('No hay usuario autenticado'); // Agrega un mensaje de advertencia
      this.loading = false; // Ocultar el estado de carga si no hay ID
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirigir al login
  }
}