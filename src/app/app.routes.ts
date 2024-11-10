import { Routes } from '@angular/router';
import { RegistroPacienteComponent } from './registro-paciente/registro-paciente.component';
import { LoginComponent } from './login/login.component';
import { HomePacienteComponent } from './home-paciente/home-paciente.component'; // Asegúrate de importar el componente correcto

export const routes: Routes = [
  { path: 'registro-paciente', component: RegistroPacienteComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomePacienteComponent }, // Ruta para el home del paciente
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirigir a login por defecto
  { path: '**', redirectTo: '/login' } // Redirigir cualquier ruta desconocida a login
];