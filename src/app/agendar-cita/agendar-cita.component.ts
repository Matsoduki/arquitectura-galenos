import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PacienteService } from '../services/paciente.service';
import { CitaService } from '../services/cita.service'; // Servicio para manejar citas
import { FormsModule } from '@angular/forms'; // Necesario para ngModel
import { IonicModule } from '@ionic/angular'; // Necesario para componentes de Ionic
import { CommonModule } from '@angular/common'; // Necesario para ngFor

@Component({
  selector: 'app-agendar-cita',
  standalone: true,
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.scss'],
  imports: [IonicModule, FormsModule, CommonModule],
})
export class AgendarCitaComponent implements OnInit {
  user: any; // Información del paciente
  medicos: any[] = []; // Lista de médicos
  selectedMedico: string = ''; // Médico seleccionado
  fecha: string = ''; // Fecha de la cita
  hora: string = ''; // Hora de la cita
  loading: boolean = true; // Estado de carga

  constructor(
    private authService: AuthService,
    private pacienteService: PacienteService,
    private citaService: CitaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUserDetails(); // Cargar los detalles del usuario al iniciar el componente
    this.getMedicos(); // Obtener la lista de médicos
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

  async getMedicos() {
    try {
      this.medicos = await this.citaService.obtenerMedicos(); // Obtener lista de médicos
    } catch (error) {
      console.error('Error al obtener médicos:', error);
    }
  }

  async agendarCita() {
    if (this.selectedMedico && this.fecha && this.hora) {
      const cita = {
        pacienteId: this.user?.id, // Asegúrate de que `user` tenga un ID
        medicoId: this.selectedMedico,
        fecha: this.fecha,
        hora: this.hora,
      };
      try {
        await this.citaService.agendarCita(cita); // Agendar la cita
        alert('Cita agendada exitosamente');
        this.router.navigate(['/home']); // Redirigir al home del paciente
      } catch (error) {
        console.error('Error al agendar la cita:', error);
        alert('No se pudo agendar la cita. Inténtalo de nuevo.');
      }
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }
}