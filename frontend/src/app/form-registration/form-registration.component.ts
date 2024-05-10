import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Verifica que este es el nombre correcto

@Component({
  selector: 'app-form-registration',
  templateUrl: './form-registration.component.html',
  styleUrls: ['./form-registration.component.scss']
})
export class FormRegistrationComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService, // Verifica que este es el nombre correcto y que tiene los métodos adecuados
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      preferencias: new FormGroup({
        web: new FormControl(false),
        backend: new FormControl(false),
        frontend: new FormControl(false),
        database: new FormControl(false)
      })
    });
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const formData = {
        nombre: this.registerForm.value.nombre,
        apellido: this.registerForm.value.apellido,
        correo: this.registerForm.value.email, // Asegúrate de que el nombre de este campo corresponde con tu backend
        contraseña: this.registerForm.value.password,
        preferencias: this.extractPreferences()
      };

      this.authService.registerUser(formData).subscribe({
        next: (response) => {
          console.log('Usuario registrado con éxito', response);
          this.router.navigate(['/dashboard']);  // Redirige al usuario al dashboard
        },
        error: (error) => {
          console.error('Error al registrar usuario', error);
        }
      });
    }
  }

  private extractPreferences(): any {
    const prefs = this.registerForm.value.preferencias;
    return Object.keys(prefs).filter(key => prefs[key]);
  }
}
