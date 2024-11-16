import { Routes } from '@angular/router';
import { RegistroPacienteComponent } from './registro-paciente/registro-paciente.component';
import { LoginComponent } from './login/login.component';
import { HomePacienteComponent } from './home-paciente/home-paciente.component';
import { AgendarCitaComponent } from './agendar-cita/agendar-cita.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RegistroMedicoComponent } from './registro-medico/registro-medico.component';
import { LoginMedicoComponent } from './login-medico/login-medico.component'; // Asegúrate de importar el nuevo componente de login para médicos

export const routes: Routes = [
  { path: 'registro-paciente', component: RegistroPacienteComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login-medico', component: LoginMedicoComponent }, // Ruta para el login de médicos
  { path: 'home-paciente', component: HomePacienteComponent },
  { path: 'agendar-cita', component: AgendarCitaComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'registro-medico', component: RegistroMedicoComponent },
  
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];