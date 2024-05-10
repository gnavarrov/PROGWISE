import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrlLogin = 'http://localhost:8080/api/usuarios/login';
  private baseUrlRegister = 'http://localhost:8080/api/usuarios/registrar';

  constructor(private http: HttpClient, private router: Router) {}

  loginUser(userData: any): Observable<any> {
    return this.http.post(this.baseUrlLogin, userData, { withCredentials: true }).pipe(
      tap(() => {
        this.router.navigate(['/dashboard']);
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
