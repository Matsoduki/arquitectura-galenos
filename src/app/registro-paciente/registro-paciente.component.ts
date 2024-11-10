import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PacienteService } from '../services/paciente.service';
import { AuthService } from '../services/auth.service'; // Asegúrate de importar AuthService
import { Paciente } from '../models/paciente.model';
import { IonicModule } from '@ionic/angular'; // Importar IonicModule

@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, IonicModule]
})
export class RegistroPacienteComponent {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private authService: AuthService // Inyectar AuthService
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]{9,15}')]],
      email: ['', [Validators.required, Validators.email]],
      direccion: [''],
      contraseña: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.registroForm.valid) {
      const { email, contraseña } = this.registroForm.value;

      // Registro en Firebase Authentication
      const isRegistered = await this.authService.register(email, contraseña);

      if (isRegistered) {
        // Si el registro fue exitoso, guardar el paciente en la base de datos
        const paciente: Paciente = this.registroForm.value;
        await this.pacienteService.agregarPaciente(paciente);
        alert('Paciente registrado con éxito!');
        this.registroForm.reset();
      } else {
        alert('Error al registrar. Verifica los datos.');
      }
    } else {
      alert('Por favor, completa el formulario correctamente.');
    }
  }
}