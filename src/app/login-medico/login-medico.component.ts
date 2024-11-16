import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login-medico',
  templateUrl: './login-medico.component.html',
  styleUrls: ['./login-medico.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule]
})
export class LoginMedicoComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const success = await this.authService.loginMedico(email, password); // Llama al método específico para médicos
      if (success) {
        this.router.navigate(['/home-medico']); // Ruta para el home del médico
      } else {
        alert('Credenciales incorrectas. Intenta de nuevo.');
      }
    } 
  }
}