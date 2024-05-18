// form-registration.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormRegistrationComponent } from './form-registration.component';
import { AuthService } from '../services/auth.service'; // Verifica que este es el nombre correcto

describe('FormRegistrationComponent', () => {
  let component: FormRegistrationComponent;
  let fixture: ComponentFixture<FormRegistrationComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRegistrationComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [AuthService] // Verifica que este es el nombre correcto
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('nombre field validity', () => {
    const nombre = component.registerForm.controls['nombre'];
    expect(nombre.valid).toBeFalsy();
    nombre.setValue('');
    expect(nombre.hasError('required')).toBeTruthy();
  });



});
