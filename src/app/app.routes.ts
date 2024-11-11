import { Routes } from '@angular/router';
import { RegistroPacienteComponent } from './registro-paciente/registro-paciente.component';
import { LoginComponent } from './login/login.component';
import { HomePacienteComponent } from './home-paciente/home-paciente.component';
import { AgendarCitaComponent } from './agendar-cita/agendar-cita.component';
import { PerfilComponent } from './perfil/perfil.component'; // Importa el PerfilComponent

export const routes: Routes = [
  { path: 'registro-paciente', component: RegistroPacienteComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home-paciente', component: HomePacienteComponent },
  { path: 'agendar-cita', component: AgendarCitaComponent },
  { path: 'perfil', component: PerfilComponent }, // Agrega esta línea para la ruta de perfil
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];