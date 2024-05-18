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
  errorMessage: string = ''; // Variable para almacenar el mensaje de error
  preferencesRequiredError: string= 'Indica alguna preferencia';
  emailExistsError: string = 'Este correo electrónico ya está en uso';

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
      preferencias: this.formBuilder.group({
        web: new FormControl(false),
        backend: new FormControl(false),
        frontend: new FormControl(false),
        database: new FormControl(false)
      })
    });
  }

  onRegister(): void {
    if (this.registerForm.valid && !this.preferenceSel()) {
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

          if (error.status === 409) {
            console.log('Correo electrónico en uso');
            this.errorMessage = this.emailExistsError; // Captura el mensaje de error del cuerpo de la respuesta HTTP
          }
        }
      });
    } else {
      console.log('Formulario no válido o ninguna preferencia seleccionada');
    }
  }

  preferenceSel(): boolean {
    const preferences = this.registerForm.value.preferencias;
    return !Object.values(preferences).some(value => value);
  }

  private extractPreferences(): any {
    const prefs = this.registerForm.value.preferencias;
    return Object.keys(prefs).filter(key => prefs[key]);
  }
}
