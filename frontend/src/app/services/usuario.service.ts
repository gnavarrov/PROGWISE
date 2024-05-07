import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

// Definición de la interfaz
export interface AuthResponse {
  token: string;
  user?: any;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrlRegister = 'http://localhost:8080/api/usuarios/registrar';
  private baseUrlLogin = 'http://localhost:8080/api/usuarios/login';

  constructor(private http: HttpClient, private router: Router) {}

  registerUser(userData: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.baseUrlRegister, userData).pipe(
      tap((response: AuthResponse) => {
        localStorage.setItem('userToken', response.token);
        this.router.navigate(['/dashboard']);
      })
    );
  }

  loginUser(userData: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.baseUrlLogin, userData).pipe(
      tap((response: AuthResponse) => {
        localStorage.setItem('userToken', response.token);
        this.router.navigate(['/dashboard']);
      })
    );
  }
}
