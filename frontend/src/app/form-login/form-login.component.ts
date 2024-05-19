import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const loginData = {
        correo: this.loginForm.value.email,
        contraseña: this.loginForm.value.password
      };

      this.authService.loginUser(loginData).subscribe({
        next: (response) => {
          console.log('Usuario autenticado con éxito', response);
          this.router.navigate(['/dashboard']);  // Redirige al usuario al dashboard
        },
        error: (error) => {
          console.error('Error al autenticar usuario', error);
          this.errorMessage = "Credenciales incorrectas";
        }
      });
    }
  }
}
