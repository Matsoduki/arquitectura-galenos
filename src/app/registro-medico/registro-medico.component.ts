import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MedicoService } from '../services/medico.service';
import { Medico, Especialidad } from '../models/medico.model';

@Component({
  selector: 'app-registro-medico',
  templateUrl: './registro-medico.component.html',
  styleUrls: ['./registro-medico.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, FormsModule] // Importa módulos necesarios
})
export class RegistroMedicoComponent {
  registroForm: FormGroup;
  showPassword: boolean = false;
  showPassword2: boolean = false;

  private clavesSecretas: { [key in Especialidad]: string } = {
    'Medicina General': 'MedGen-2024',
    'Kinesiología': 'Kinesio-2024',
    'Oftalmología': 'Oftalmo-2024',
    'Otorrinolaringología': 'Otorrino-2024'
  };

  constructor(private fb: FormBuilder, private medicoService: MedicoService) {
    this.registroForm = this.fb.group({
      rut: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]], // Campo de correo
      especialidad: ['', Validators.required],
      claveSecreta: ['', Validators.required],
      contraseña: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.registroForm.valid) {
      const especialidad: Especialidad = this.registroForm.value.especialidad;
      const claveSecretaIngresada = this.registroForm.value.claveSecreta.trim();
      const claveSecretaCorrecta = this.clavesSecretas[especialidad].trim();

      if (claveSecretaIngresada === claveSecretaCorrecta) {
        const medico: Medico = {
          rut: this.registroForm.value.rut,
          nombre: this.registroForm.value.nombre,
          apellido: this.registroForm.value.apellido,
          especialidad: especialidad,
          claveSecreta: claveSecretaCorrecta,
          contraseña: this.registroForm.value.contraseña,
          correo: this.registroForm.value.correo // Incluye el correo aquí
        };

        try {
          const id = await this.medicoService.registrarMedico(medico);
          alert(`Médico registrado con éxito. ID: ${id}`);
        } catch (error) {
          console.error('Error al registrar médico:', error);
          alert('Error al registrar médico: ' + (error as any).message);
        }
      } else {
        alert('La clave secreta ingresada no es correcta para la especialidad seleccionada.');
      }
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }
}