import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-form-registration',
  templateUrl: './form-registration.component.html',
  styleUrls: ['./form-registration.component.scss']
})
export class FormRegistrationComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string = '';
  preferencesRequiredError: string = 'Debes seleccionar al menos una preferencia.';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
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

    // Suscribirse a los cambios en el formulario de preferencias
    this.registerForm.get('preferencias')!.valueChanges.subscribe(() => {
      this.validatePreferences();
    });

    // Validar preferencias al inicio
    this.validatePreferences();
  }

  validatePreferences(): void {
    const preferencesSelected = this.preferenceSel();
    this.preferencesRequiredError = preferencesSelected ? '' : 'Debes seleccionar al menos una preferencia.';
  }

  preferenceSel(): boolean {
    const prefs = this.registerForm.get('preferencias') as FormGroup;
    return Object.values(prefs.controls).some(control => control.value);
  }

  onRegister(): void {
    this.validatePreferences();
    if (this.registerForm.valid && this.preferenceSel()) {
      const formData = {
        nombre: this.registerForm.value.nombre,
        apellido: this.registerForm.value.apellido,
        correo: this.registerForm.value.email,
        contraseña: this.registerForm.value.password,
        preferencias: this.extractPreferences()
      };

      this.authService.registerUser(formData).subscribe({
        next: (response) => {
          console.log('Usuario registrado con éxito', response);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error al registrar usuario', error);
          this.errorMessage = 'El correo electrónico ya está registrado. Intenta con otro.';
        }
      });
    }
  }

  private extractPreferences(): any {
    const prefs = this.registerForm.value.preferencias;
    return Object.keys(prefs).filter(key => prefs[key]);
  }
}
