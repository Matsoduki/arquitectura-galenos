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
  standalone: true, // Marca el componente como standalone
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.scss'],
  imports: [IonicModule, FormsModule, CommonModule], // Agrega CommonModule aquí
})
export class AgendarCitaComponent implements OnInit {
  user: any; // Información del paciente
  medicos: any[] = []; // Lista de médicos
  selectedMedico: string = ''; // Médico seleccionado
  fecha: string = ''; // Fecha de la cita
  hora: string = ''; // Hora de la cita

  constructor(
    private authService: AuthService,
    private pacienteService: PacienteService,
    private citaService: CitaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUserDetails(); // Cargar detalles del usuario
    this.getMedicos(); // Obtener la lista de médicos
  }

  async loadUserDetails() {
    const userId = this.authService.getCurrentUserId(); // Obtener el ID del usuario actual
    if (userId) {
      this.user = await this.pacienteService.obtenerPacientePorId(userId); // Asegúrate de que este método regrese una promesa
      if (!this.user) {
        console.warn('No se encontró el paciente con este ID.');
      }
    } else {
      console.warn('No hay usuario autenticado');
    }
  }

  async getMedicos() {
    this.medicos = await this.citaService.obtenerMedicos(); // Implementar este método en el servicio
  }

  async agendarCita() {
    if (this.selectedMedico && this.fecha && this.hora) {
      const cita = {
        pacienteId: this.user.id,
        medicoId: this.selectedMedico,
        fecha: this.fecha,
        hora: this.hora,
      };
      await this.citaService.agendarCita(cita); // Implementar este método en el servicio
      alert('Cita agendada exitosamente');
      this.router.navigate(['/home']); // Redirigir al home del paciente
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }
}