import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']  // Añadir este estilo si existe el archivo
})
export class FormLoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

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
      const formData = {
        correo: this.loginForm.value.email,
        contraseña: this.loginForm.value.password
      };


      this.authService.loginUser(formData).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          if (response && response.message === 'Inicio de sesión exitoso') {
            console.log('Inicio de sesión exitoso');
            this.router.navigate(['/dashboard']); // Redirigir al usuario al dashboard
          } else {
            this.errorMessage = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
            this.loginForm.reset(); // Limpiar el formulario
            // También podrías mostrar una alerta aquí si lo prefieres
          }
        },
        error: (error) => {
          console.error('Error al iniciar sesión:', error);
          this.errorMessage = 'Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.';
          this.loginForm.reset(); // Limpiar el formulario
          // También podrías mostrar una alerta aquí si lo prefieres
        }
      });

}
  }
}
