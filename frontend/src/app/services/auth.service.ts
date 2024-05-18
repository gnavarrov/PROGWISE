import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrlLogin = 'http://localhost:8080/api/usuarios/login';
  private baseUrlRegister = 'http://localhost:8080/api/usuarios/registro';

  constructor(private http: HttpClient, private router: Router) {}
  loginUser(userData: any): Observable<any> {
    return this.http.post<any>(this.baseUrlLogin, userData, { withCredentials: true })
      .pipe(
        tap(response => {
          console.log('Respuesta del servidor:', response);
          if (response.message === "Inicio de sesión exitoso") {
            console.log('Inicio de sesión exitoso');
            this.router.navigate(['/dashboard']);
          } else {
            console.error('Error al iniciar sesión:', response);
            throw new Error(response.message);
          }
        }),
        catchError((error: any) => {
          console.error('Error al iniciar sesión:', error);
          return throwError(error);
        })
      );
  }





  registerUser(userData: any): Observable<any> {
    return this.http.post(this.baseUrlRegister, userData, { withCredentials: true }).pipe(
      tap(() => {
        this.router.navigate(['/dashboard']);
      })
    );
  }
}
