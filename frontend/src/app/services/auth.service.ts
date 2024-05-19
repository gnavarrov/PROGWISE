import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface AuthResponse {
  token: string;
  user?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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

  logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userToken');
  }
}
